const mongoose = require("mongoose");
const Portfolio = mongoose.model("Portfolio");

exports.getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({});
    return res.json(portfolios);
  } catch (error) {
    console.error(error);
  }
};

exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    return res.json(portfolio);
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
};

exports.createPortfolio = async (req, res) => {
  const portfolioData = req.body;
  console.log(portfolioData);
  const userId = req.auth.sub;
  const portfolio = new Portfolio(portfolioData);
  portfolio.userId = userId;
  try {
    const savedPortfolio = await portfolio.save();
    return res.json(savedPortfolio);
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
};



exports.updatePortfolio = async (req, res)=>{
  const {body, params:{id}} =req;
  try {
    const updatedPortfolio = await Portfolio.findByIdAndUpdate({_id:id},body,{new:true, runValidators:true});
    return res.json(updatedPortfolio);
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
}


exports.deletePortfolio = async (req, res) => {
  try {
  const portfolio = await Portfolio.findOneAndRemove({_id: req.params.id});
  return res.json({_id: portfolio.id}) 
  } catch (error) {
    res.status(error.status || 422).json({message: error.message || 'Something went wrong'});
  }
}