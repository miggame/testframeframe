fs = require('fs')
path = require('path')
#mkdir = require('mkdirp')

config = require("#{process.cwd()}/entitas.json")

getType = (arg) ->
  switch arg
    when 'Int'      then 'Int'
    when 'Float'    then 'Float'
    when 'String'   then 'String'
    when 'Boolean'  then 'Boolean'
    else arg

sloop = (p,f)->
      cp = p+"/"+ f
      if fs.statSync(cp).isDirectory()
        deleteall(cp)
      else
        fs.unlinkSync(cp)


deleteall = (p) ->
  files = [];  
  if fs.existsSync(p)
    files = fs.readdirSync(p)

    sloop p,food for food in files

    fs.rmdirSync(p)
      


#
# generate entity extensions
#
# @return none
#
run = (flags...) ->

    #dbg = if flags.indexOf('-d') or flags.indexOf('--debug') then true else false
    dbg = config.debug
    #console.log('debug = ',dbg)
    ts = [] # StringBuilder for generated typescript code
    ts2 = []
    js = [] # StringBuilder for generated javascript code
    d0 = [] # StringBuilder for associated *.d.ts file: Components
    d1 = [] # StringBuilder for associated *.d.ts file: Entity
    d2 = [] # StringBuilder for associated *.d.ts file: Matcher
    d3 = [] # StringBuilder for associated *.d.ts file: Pool
    ex = {} # Extensions

  
    #mkdir.sync path.dirname(path.join(process.cwd(), config.output.typescript))
    #console.log(config.output.typescript)
    #console.log(path.join(process.cwd(), config.output.typescript+"/"))
    
    
    
    deleteall(path.join(process.cwd(), config.output.typescript+"/"))
    fs.mkdirSync(path.join(process.cwd(), config.output.typescript+"/"))
    for Name, properties of config.components
      
      ts2.push "import { BaseComponent } from \"../../../framework/entity/BaseComponent\";"
      ts2.push "  export class #{Name}Component extends BaseComponent {"
      for p in properties
        ts2.push "    public get #{p.split(':')[0]}() {"
        ts2.push "      return this._#{p.split(':')[0]};"
        ts2.push "    }"
        ts2.push ""
        ts2.push "    public set #{p.split(':')[0]}(val) {"
        ts2.push "      if (this._#{p.split(':')[0]} != val)"        
        ts2.push "        this.mark = true;"       
        ts2.push "      this._#{p.split(':')[0]} = val;"
        ts2.push "    }"        
        ts2.push ""
        ts2.push "    private _#{p};"
        ts2.push ""
      ts2.push "}"
      
      fs.writeFileSync(path.join(process.cwd(), config.output.typescript+"/#{Name}Component.ts"), ts2.join('\n'))
      ts2 = []
    
    ts2 = []
    
    ts2.push "  export class RegisterComponent {"
    for Name, properties of config.components
        ts2.push "    public static #{Name}Component:string = \"game.component.#{Name}Component\";"
    ts2.push "  }"
    
    fs.writeFileSync(path.join(process.cwd(), config.output.typescript+"/RegisterComponent.ts"), ts2.join('\n'))


run(1,2)

    

    
    


   
