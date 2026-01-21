qx.Class.define("studentInfo.pages.MainPage", {
  extend: qx.ui.container.Composite,

  construct: function (testParam) {
    this.base(arguments);

    console.log("LoginPage initialized with param:", testParam);

    // Set the layout for the entire page
    this.setLayout(new qx.ui.layout.Canvas());

    // Create a container for the login content
    var loginContainer = new qx.ui.container.Composite(
      new qx.ui.layout.VBox(10),
    );

    var logo = new qx.ui.basic.Image("studentInfo/student.png");
    logo.set({
      width: 100, // Set the width to 100 pixels
      height: 100, // Set the height to 100 pixels
      scale: true, // Ensure the image scales properly
      alignX: "center",
      alignY: "middle",
    });
    loginContainer.add(logo);

    var header = new qx.ui.basic.Label("Student Information System");
    header.setFont("bold");
    loginContainer.add(header);

    var usernameTextField = new qx.ui.form.TextField();
    usernameTextField.setPlaceholder("Username");
    loginContainer.add(usernameTextField);

    var passwordTextField = new qx.ui.form.PasswordField();
    passwordTextField.setPlaceholder("Password");
    loginContainer.add(passwordTextField);

    var button = new qx.ui.form.Button("Login");
    loginContainer.add(button);

    var messageLabel = new qx.ui.basic.Label();
    messageLabel.set({
      textColor: "red",
      alignX: "center",
      alignY: "middle",
    });
    loginContainer.add(messageLabel);

    var madeWithLabel = new qx.ui.basic.Label(
      "Made with ❤️ by Okonut using Qooxdoo.",
    );
    madeWithLabel.set({
      alignX: "center",
      alignY: "middle",
    });
    loginContainer.add(madeWithLabel);

    // Login Logic
    button.addListener(
      "execute",
      function () {
        if (
          usernameTextField.getValue() != null &&
          passwordTextField.getValue() != null
        ) {
          alert("Login successful!");
          this.hide();
          return 
        } else {
          messageLabel.setValue("Invalid username or password.");
        }
      },
      this,
    );

    // Center the login container on the page
    this.add(loginContainer, {
      left: "50%",
      top: "50%",
    });

    // Adjust the position to truly center the container
    loginContainer.addListenerOnce(
      "appear",
      function () {
        var bounds = loginContainer.getBounds();
        loginContainer.setLayoutProperties({
          left: Math.round((this.getBounds().width - bounds.width) / 2),
          top: Math.round((this.getBounds().height - bounds.height) / 2),
        });
      },
      this,
    );
  },
});
