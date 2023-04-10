const mongoose= require ('mongoose');

mongoose.set("strictQuery", true)
mongoose.Promise=global.Promise
async function main() {
    await mongoose.connect(process.env.DBURL);
};

 module.exports= main;