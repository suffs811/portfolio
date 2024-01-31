#!/bin/bash
# bash script to ask GTFObins if privesc vector exists for SUID files
#
# > After running `find / -type f -perm /4000 2>/dev/null` on a compromised host, 
#   save the resulting SUID paths to a file on your local machine and run this script
#   to quickly see whether any of them can be used for privilege escalation.
#
# usage: ./binq.sh suid.txt

echo
echo "================================================"
echo "================= gtfoBINs Query ==============="
echo "================================================"
echo "                                       @suffs811"

if [ "$1" == "" ]
then
	echo
	echo "+--------------------------------+"
	echo "usage: ./binq.sh <suid_list_file>"
	echo "+--------------------------------+"
	echo

else
	declare -a success=()
	echo
	echo "[#] Searching GTFObins for:"
	for i in $(cat $1);
	do
		k=(${i//\// })
		l=${#k[@]}
		j=$(echo $i | cut -d "/" -f $((l+1)))
		echo [+] $j
	done
	echo
	echo "+ + + + + + + + + + + + + + + + + + + + + + + +"
	echo
	echo "[#] Gathering response codes..."
	for i in $(cat $1);
	do
		k=(${i//\// })
		l=${#k[@]}
		j=$(echo $i | cut -d "/" -f $((l+1)))
		r=$(curl -I -L -s -w '%{response_code}\n' -o /dev/null "https://gtfobins.github.io/gtfobins/$j")
		if [ $r == "200" ]
		then
			echo [+] $j [$r]
			success+=($j)
		else
			echo [-] $j [$r]
		fi
	done
	echo

	echo "################## Findings: ##################"
	echo
	if [ "$success" == "" ]
	then
		echo "[-] No GTFObins entries found :("
	else
		for s in ${success[@]};
		do
			echo "[+] GTFObins has an entry for $(echo $s | tr -d "/")!"
		done
	fi
	echo
	echo "###############################################"
	echo
	echo ">> GTFObins: https://gtfobins.github.io/"
	echo
fi
