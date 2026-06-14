import fs from "fs";
import path from "path";

const files = [
  path.resolve(import.meta.dirname, "../public/invite/297/index.html"),
  path.resolve(import.meta.dirname, "../public/invite/297/allrecords.html"),
];

const marker = "<!-- invite297-rsvp-handler -->";

const formOld =
  'id="form2134660383" name=\'form2134660383\' role="form" action=\'\' method=\'POST\' data-formactiontype="0" data-inputbox=".t-input-group" class="t-form js-form-proccess t-form_inputs-total_4 t-form_bbonly t-conditional-form" data-success-callback="t678_onSuccess"';

const formNew =
  'id="form2134660383" name=\'form2134660383\' role="form" action="#" method="POST" novalidate data-formactiontype="-1" data-inputbox=".t-input-group" class="t-form t-form_inputs-total_4 t-form_bbonly t-conditional-form" data-rsvp-custom="1"';

const handler = `${marker}
<script>
(function () {
  window.t678_onSuccess = function () {};

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function disableTildaForm(form) {
    form.classList.remove("js-form-proccess");
    form.removeAttribute("data-success-callback");
    form.setAttribute("data-formactiontype", "-1");
    form.setAttribute("action", "#");
    form.setAttribute("novalidate", "novalidate");

    var btn = form.querySelector(".t-submit, button.t-btnflex_type_submit");
    if (btn) btn.type = "button";
  }

  function bindForm() {
    var form = document.getElementById("form2134660383");
    if (!form) return;

    disableTildaForm(form);

    var successBox = form.querySelector(".js-successbox");
    var submitBtn = form.querySelector(".t-submit, button.t-btnflex_type_submit");
    var errorTop = form.querySelector(".t-form__errorbox-wrapper");

    function showSuccess() {
      if (successBox) successBox.style.display = "block";
      var inputsBox = form.querySelector(".t-form__inputsbox");
      if (inputsBox) inputsBox.style.display = "none";
      var submitWrap = form.querySelector(".t-form__submit");
      if (submitWrap) submitWrap.style.display = "none";
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function showError(message) {
      if (!errorTop) {
        alert(message);
        return;
      }
      errorTop.style.display = "block";
      var item = errorTop.querySelector(".js-rule-error-all");
      if (item) item.textContent = message;
    }

    function hideError() {
      if (errorTop) errorTop.style.display = "none";
    }

    function getPayload() {
      var side = form.querySelector('input[name="Radio"]:checked');
      var nameInput = form.querySelector('input[name="Անուն"]');
      var attendance = form.querySelector('input[name="Ներկայություն"]:checked');
      var guestsInput = form.querySelector('input[name="Հյուրերի թիվ"]');

      return {
        side: side ? side.value : "",
        name: nameInput ? nameInput.value.trim() : "",
        attendance: attendance ? attendance.value : "",
        guestCount: guestsInput ? guestsInput.value.trim() : "",
      };
    }

    function submitRsvp(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
      hideError();

      var payload = getPayload();
      if (!payload.side || !payload.name || !payload.attendance) {
        showError("Խնդրում ենք լրացնել բոլոր պահանջվող դաշտերը");
        return false;
      }
      if (payload.attendance === "Մենք կգանք" && !payload.guestCount) {
        showError("Խնդրում ենք նշել հյուրերի թիվը");
        return false;
      }

      if (submitBtn) submitBtn.disabled = true;

      fetch("/api/invite/297/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (response) {
          return response.json().then(function (data) {
            if (!response.ok || !data.ok) {
              throw new Error(data.message || "Չհաջողվեց ուղարկել");
            }
            showSuccess();
          });
        })
        .catch(function (error) {
          showError(error.message || "Չհաջողվեց ուղարկել");
          if (submitBtn) submitBtn.disabled = false;
        });

      return false;
    }

    if (form.dataset.rsvpBound !== "1") {
      form.dataset.rsvpBound = "1";
      form.addEventListener("submit", submitRsvp, true);
    }

    if (submitBtn && submitBtn.dataset.rsvpClickBound !== "1") {
      submitBtn.dataset.rsvpClickBound = "1";
      submitBtn.type = "button";
      submitBtn.addEventListener("click", submitRsvp, true);
    }
  }

  ready(bindForm);
  setTimeout(bindForm, 300);
  setTimeout(bindForm, 1500);

  if (typeof t_onReady === "function") {
    t_onReady(function () {
      setTimeout(bindForm, 100);
      setTimeout(bindForm, 2000);
    });
  }
})();
</script>`;

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");

  if (html.includes(formOld)) {
    html = html.replace(formOld, formNew);
  } else if (html.includes('id="form2134660383"')) {
    html = html.replace(/\sjs-form-proccess/g, "");
    html = html.replace(
      /(id="form2134660383"[^>]*?)data-success-callback="t678_onSuccess"/,
      "$1",
    );
    html = html.replace(
      /(id="form2134660383"[^>]*?)data-formactiontype="[^"]*"/,
      '$1data-formactiontype="-1"',
    );
  }

  html = html.replace(
    /(<form[^>]*id="form2134660383"[\s\S]*?<button[^>]*class="[^"]*t-btnflex_type_submit[^"]*"[^>]*)type="submit"/,
    '$1type="button"',
  );

  if (html.includes(marker)) {
    html = html.replace(/<!-- invite297-rsvp-handler -->[\s\S]*?<\/script>/, handler);
  } else {
    const anchor = '<div id="rec2134660383"';
    if (!html.includes(anchor)) {
      console.error(`RSVP block not found in ${path.basename(file)}`);
      process.exit(1);
    }
    html = html.replace(anchor, `${handler}\n<div id="rec2134660383"`);
  }

  fs.writeFileSync(file, html);
  console.log(`Injected RSVP handler into ${path.basename(file)}`);
}
