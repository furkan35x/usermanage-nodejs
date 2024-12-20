const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const connectDB=require('./config/db.js');
const userRoutes=require('./routes/userRoutes.js');

dotenv.config();

const app=express();
const PORT=process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/users',userRoutes);

app.use((err,req,res,next) =>{
    console.error(err.stack);
    res.status(500).json({message:'Something went wrong!'});
});
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})