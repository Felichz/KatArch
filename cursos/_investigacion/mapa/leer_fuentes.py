import re,sys,os,subprocess
root='/Users/felixandersson/dev/felichz/KatArch'
repo,*ids=sys.argv[1:]
md=open(f'{root}/cursos/_investigacion/texto/{repo}.md',encoding='utf-8').read()
files=subprocess.run(['git','ls-files'],cwd=f'{root}/katas-src/{repo}',capture_output=True,text=True).stdout.split('\n')
for i in ids:
    m=re.search(rf'^#### {i} · .*?(?=^#### H|\Z)',md,flags=re.M|re.S)
    if not m: print(repo,i,'no existe'); continue
    b=m.group(0)
    print('\n===',repo,b.split('\n')[0][:110])
    fu=re.search(r'^- Fuente: (.*)$',b,flags=re.M)
    if not fu: continue
    for f,a,c in re.findall(r'([\w.\-/ ]+?\.(?:md|txt|json|yml|yaml|html))(?::(\d+)(?:-(\d+))?)?',fu.group(1).replace('`',''))[:4]:
        f=f.strip()
        cands=[x for x in files if x==f or x.endswith('/'+f) or os.path.basename(x)==os.path.basename(f)]
        if not cands: print('  [no encontrado]',f); continue
        p=cands[0]
        L=open(f'{root}/katas-src/{repo}/{p}',encoding='utf-8',errors='replace').read().split('\n')
        s=int(a) if a else 1; e=int(c) if c else min(s+2,len(L))
        print(f'  -- {p}:{s}-{e}')
        for k in range(s,min(e,s+6,len(L))+1):
            print(f'   {k}: {L[k-1].strip()[:200]}')
