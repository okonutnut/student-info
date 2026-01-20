qx.Class.define("studentInfo.components.TableView", {
  extend: qx.ui.table.Table,

  construct: function (tableModel) {
    // Pass model to parent constructor
    this.base(arguments, tableModel);

    // Table size
    this.set({
      width: 700,
      height: 400,
    });

    // Column widths
    var columnModel = this.getTableColumnModel();
    columnModel.setColumnWidth(0, 100);
    columnModel.setColumnWidth(1, 200);
    columnModel.setColumnWidth(2, 150);
    columnModel.setColumnWidth(3, 250);
  },
});
