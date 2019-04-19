const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()


app.use(express.static('static'))


app.get('/', (req, res) => res.send('Hello World!'))


app.listen(3000, () => console.log('Example app listening on port 3000!'))


const course = JSON.parse(fs.readFileSync(path.resolve(__dirname,'./goods.json')).toString())

const allData = []

course.tags.forEach(key=>{
  course.data[key].forEach(cor=>{
    allData.push(cor)
  })
})


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});






  app.get('/api/top', (req,res)=>{
    const newData = [...allData]
    newData.sort((a,b)=>{
      return b.solded-a.solded
    })
    res.json({
      code:0,
      data:newData.slice(0,5)
    })
  })
  app.get("/api/goods",(req,res)=>{
    const page = req.query.page || 1

    const start = (page-1)*10
    const end = start+10
    setTimeout(()=>{
      res.json({
        code:0,
        data:allData.slice(start,end)
      })
    },1000)
  })

  app.get('/api/detail',(req,res)=>{
    const {id} = req.query
    course.tags.forEach(key=>{
      course.data[key].forEach(cor=>{
        console.log(cor.id,id)
        if(cor.id==id){
          cor.desc=`
          目前推出在线课程有:
          《javascript》，《React》，《vue》，《nodejs》，《python》`
          return res.json({
            code:0,
            data:{
              detail:cor,
            }
          })
        }
      })
    })
  })

  app.post('/api/login',(req,res)=>{
    const {username,passwd} = req.body
    console.log(username,passwd)
    if(username=='hujun' && passwd=="123"){
      return res.json({
        code:0,
        data:{
          token:'studyisgood',
          role:'admin',
          balance:1000,
          username:"hujun"
        }
      })
    }
    if(username=='hujun' && passwd=="123"){
      return res.json({
        code:0,
        data:{
          token:'studyisgood',
          role:'user',
          balance:100,
          username:'hujun'
        }
      })
    }
    return res.json({
      code:-1,
      msg:'密码错误'
    })
  })
 