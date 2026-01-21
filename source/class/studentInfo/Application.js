/* ************************************************************************

   Copyright: 2026 undefined

   License: MIT license

   Authors: undefined

************************************************************************ */

/**
 * This is the main application class of "studentInfo"
 *
 * @asset(studentInfo/*)
 */
qx.Class.define("studentInfo.Application", {
  extend: qx.application.Standalone,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members: {
    /**
     * This method contains the initial application code and gets called
     * during startup of the application
     *
     * @lint ignoreDeprecated(alert)
     */
    main() {
      // Call super class
      super.main();

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug")) {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      // Global Variable
      let isLoggedIn = false;
      // Set up the root container
      var doc = this.getRoot();

      var vbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));

      // Login page
      var loginPage = new studentInfo.pages.LoginPage(isLoggedIn);

      // doc.add(loginPage, {edge: 0})
      
      var tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns(["ID", "Name", "Age", "Email"]);
      var tableData = [[1, "Alice", 20, "alice@email.com"]];
      tableModel.setData(tableData);
      var tablePage = new studentInfo.components.TableView(tableModel);

      // Start 
      doc.add(loginPage, {edge: 0})
      
      // Add the login page directly to the root
      loginPage.addListener("changeLoggedIn", function(e) {
        console.log(e.getData())
        isLoggedIn = e.getData()

        doc.removeAll();

        if (!isLoggedIn) {
          doc.add(loginPage, { edge: 0 });
        } else {
          doc.add(tablePage, {edge: 0})
        }
      })
    },
  },
});
