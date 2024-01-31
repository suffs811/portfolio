# gtfoBINs Query
## binq is a bash script to ask GTFObins if privesc vectors exist for SUID files

After running `find / -type f -perm /4000 2>/dev/null` on a compromised host, save the resulting SUID paths to a file on your local machine and run this script to quickly see whether any of them can be used for privilege escalation.

usage: `./binq.sh suid.txt`
