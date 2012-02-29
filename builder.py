#!/usr/bin/python

import sys
import json
import os
import re
import fcntl
import getopt

path = sys.argv[1]

# open -p
f = os.open(path, os.O_RDONLY)

fi = os.stat(path)

js = os.read(f, fi.st_size)

# json clean
js = re.sub(r'^this\.PATHS\s*=\s*', r'', js);
js = re.sub(r';*$', r'', js);
js = re.sub(r'//[^\n]*\r*\n', r'', js);

# json parse
jsv = json.loads(js);

jsc = dict()
tmp = dict()
l10n = dict()
copy = dict()

# prepare
for item in jsv:
    if "buildTo" in item and "url" in item:
        if item.has_key("build") and item["build"] == "jsc":
            buildTo = item["buildTo"]
            if not jsc.has_key(buildTo): jsc[buildTo] =  []
            jsc[buildTo].append({"path": item["url"], "name": None})
        elif item.has_key("build") and item["build"] == "tmp":
            buildTo = item["buildTo"]
            if not tmp.has_key(buildTo): tmp[buildTo] =  []
            tmp[buildTo].append({"path": item["url"], "name": item["name"]})
        elif item.has_key("build") and item["build"] == "l10n":
            buildTo = item["buildTo"]
            if not l10n.has_key(buildTo):  l10n[buildTo] =  []
            l10n[buildTo].append({"path": item["url"], "name": item["name"]})
        else :
            buildTo = item["buildTo"];
            if not copy.has_key(buildTo): copy[buildTo] =  []
            copy[buildTo].append({"path": item["url"], "name": None})
        #paths.append(buildTo)
        
# options
prefix = ""
GlobalName = 'Cart'
tmpGlobalName = 'Templates'
l10nGlobalName = 'L10ns'
mGlobalName = 'Models'
cllGlobalName = 'Collections'
vGlobalName = 'Views'

# tmp
for (key, value) in tmp.iteritems():
    f = os.open(prefix+key, os.O_CREAT | os.O_TRUNC | os.O_WRONLY)
    os.write(f, "window."+GlobalName+" = window."+GlobalName+" || {}; "+GlobalName+"."+tmpGlobalName+" = "+GlobalName+"."+tmpGlobalName+" || {};\n")
    for item in value:
        f1 = os.open(prefix+item["path"], os.O_RDONLY)
        f1i = os.stat(prefix+item["path"])
        s = os.read(f1, f1i.st_size)
        os.close(f1)
        s = re.sub(r'\r*\n|\t', r'', s)
        s = re.sub(r'"', r'\"', s)
        name = item["name"]
        name = name.decode("utf-8")
        s = s.decode("utf-8")
        s = "/*\n * @path: "+item["path"]+"\n */\n"+GlobalName+"."+tmpGlobalName+"['"+name+"'] = \""+s+"\"\n"
        os.write(f, s.encode("utf-8"))
    os.close(f);
    
# l10n
for (key, value) in l10n.iteritems():
    f = os.open(prefix+key, os.O_CREAT | os.O_TRUNC | os.O_WRONLY)
    os.write(f, "window."+GlobalName+" = window."+GlobalName+" || {}; "+GlobalName+"."+l10nGlobalName+" = "+GlobalName+"."+l10nGlobalName+" || {};\n")
    for item in value:
        f1 = os.open(prefix+item["path"], os.O_RDONLY)
        f1i = os.stat(prefix+item["path"])
        s = os.read(f1, f1i.st_size)
        os.close(f1)
        s = re.sub(r'\r*\n|\t', r'', s)
        s = re.sub(r'"', r'\"', s)
        name = item["name"]
        name = name.decode("utf-8")
        s = s.decode("utf-8")
        s = "/*\n * @path: "+item["path"]+"\n */\n"+GlobalName+"."+l10nGlobalName+"['"+name+"'] = \""+s+"\"\n"
        os.write(f, s.encode("utf-8"))
    os.close(f);
    
# jsc
for (key, value) in jsc.iteritems():
    f = os.open(prefix+key, os.O_CREAT | os.O_TRUNC | os.O_WRONLY)
    os.write(f, "window."+GlobalName+" = window."+GlobalName+" || {}; "+GlobalName+"."+mGlobalName+" = "+GlobalName+"."+mGlobalName+" || {}; "+GlobalName+"."+cllGlobalName+" = "+GlobalName+"."+cllGlobalName+" || {}; "+GlobalName+"."+vGlobalName+" = "+GlobalName+"."+vGlobalName+" || {}; \n")
    for item in value:
        f1 = os.open(prefix+item["path"], os.O_RDONLY)
        f1i = os.stat(prefix+item["path"])
        s = os.read(f1, f1i.st_size)
        os.close(f1)
        s = "/*\n * @path: "+item["path"]+"\n */\n"+s.decode("utf-8")+"\n"
        os.write(f, s.encode("utf-8"))
    os.close(f);
