adminPage = (req, res) => { 
    console.log("View -> AdministrativePage -> /admin")
    res.render("administrativePages/admin.pug", {});
}

module.exports.adminPage = adminPage;