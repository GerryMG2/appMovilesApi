main = (req, res) => { 
    console.log("View -> MainPage -> /loginweb")
    res.render("webApp/mainPage.pug", {});
}

module.exports.main = main;