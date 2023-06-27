const { portfolios, blogs } = require("./data");
const Portfolio = require("../models/portfolio");
const Blog = require("../models/blog");

class FakeDB {
  async clean() {
    await Portfolio.deleteMany({});
    await Blog.deleteMany({});
  }
  async addData() {
    await Portfolio.create(portfolios);
    await Blog.create(blogs);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = new FakeDB();
