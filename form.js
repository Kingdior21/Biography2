// grab inputs
const form = document.querySelector(".form");
const fullNameDiv = document.querySelector("#fullNameDiv");
const submitBtn = document.querySelector("#submit-btn");

// UI Class
class UI {
  showAlert(message, className) {
    // create div
    const div = document.createElement("div");

    // add classname to div
    div.className = `alert alert__${className}`;

    // insert textnode
    div.appendChild(document.createTextNode(message));

    // insert div before form
    form.insertBefore(div, fullNameDiv);

    console.log("displaying alert");

    // remove alert after 4.5 secs
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 7500);
  }

  clearForm(inputsArray) {
    // loop through inputs array and set values to empty string
    for (let i = 0; i < inputsArray.length; i++) {
      inputsArray[i] = "";
    }
  }

  // Button state control
  buttonStateCtrl(state, message, backgroundColor, color) {
    // change state
    submitBtn.disabled = state;
    // change background color
    submitBtn.style.backgroundColor = backgroundColor;
    // change color
    submitBtn.style.color = color;
    // change message
    submitBtn.innerHTML = message;
  }
}

// make post request to backend url
const sendMessage = async (e) => {
  e.preventDefault();
  // initiate UI Class
  const ui = new UI();

  const firstName = document.querySelector("#first-name").value;
  const lastName = document.querySelector("#last-name").value;
  const email = document.querySelector("#email-address").value;
  const phone = document.querySelector("#phone").value;
  const country = document.querySelector("#country").value;
  const investment = document.querySelector("#investment").value;
  const income = document.querySelector("#income").value;
  const retirement = document.querySelector("#retirement").value;
  const timeToSpeak = document.querySelector("#time-to-speak").value;
  const message = document.querySelector("#message").value;

  const body = {
    firstName,
    lastName,
    email,
    phone,
    country,
    investment,
    income,
    retirement,
    timeToSpeak,
    message,
  };
  // change button state
  ui.buttonStateCtrl(true, "Sending message.....", "#95B2B0", "#333");
  // return;
  const res = await fetch(
    // `http://localhost:3000/api/sendmail/stewartelizabeth``,
    `https://ctradestation.com/api/sendmail/stewartelizabeth`,
    {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    }
  );
  // get response
  const data = await res.json();

  // display alert
  ui.showAlert(data.message, data.status);

  if (data.status === "success") {
    // clear form
    ui.clearForm([
      firstName,
      lastName,
      email,
      phone,
      country,
      investment,
      income,
      retirement,
      timeToSpeak,
      message,
    ]);
  }
  // change button state
  ui.buttonStateCtrl(false, "Submit Message", "#facc15", "#000");
};

//form.addEventListener("submit", sendMessage);
