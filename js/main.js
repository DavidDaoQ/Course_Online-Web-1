window.addEventListener("load", () => {
  // page loader
  document.querySelector(".js-page-loader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".js-page-loader").style.display = "none";
  }, 500);
});

/*-----------------------------------
* 	testimonial slider
 -----------------------------------*/
function testimonialSlider() {
  const carouselOne = document.getElementById("carouselOne");
  if (carouselOne) {
    /**if the element exists */
    carouselOne.addEventListener("slid.bs.carousel", function () {
      const activeItem = this.querySelector(".active");
      document.querySelector(".js-testimonial-img").src =
        activeItem.getAttribute("data-js-testimonial-img");
    });
  }
}
testimonialSlider();
/**
 * course preview video
 */
function coursePreviewVideo() {
  const coursePreviewModal = document.querySelector(".js-course-preview-modal");
  if (coursePreviewModal) {
    // If the element exists
    coursePreviewModal.addEventListener("shown.bs.modal", function () {
      this.querySelector(".js-course-preview-video").play();
      this.querySelector(".js-course-preview-video").currentTime = 0;
    });
    coursePreviewModal.addEventListener("hide.bs.modal", function () {
      this.querySelector(".js-course-preview-video").pause();
    });
  }
}
coursePreviewVideo();

/**
 * header menu
 * */
function headerMenu() {
  const menu = document.querySelector(".js-header-menu");
  const backdrop = document.querySelector(".js-header-backdrop");
  const menuCollapseBreakpoint = 991;

  function toggleMenu() {
    menu.classList.toggle("open");
    backdrop.classList.toggle("active");
    document.body.classList.toggle("overflow-hidden");
  }
  document.querySelectorAll(".js-header-menu-toggler").forEach((item) => {
    item.addEventListener("click", toggleMenu);
  });

  // đóng menu bằng cách nhấp vào bên ngoài nó
  backdrop.addEventListener("click", toggleMenu);

  function collapse() {
    menu.querySelector(".active .js-sub-menu").removeAttribute("style");
    menu.querySelector(".active").classList.remove("active");
  }

  menu.addEventListener("click", (event) => {
    const { target } = event;

    if (
      target.classList.contains("js-toggle-sub-menu") &&
      window.innerWidth <= menuCollapseBreakpoint
    ) {
      // Ngăn hành vi nhấp chuột lâu
      event.preventDefault();

      // nếu mục menu đã được mở rộng, hãy thu gọn nó và thoát
      if (target.parentElement.classList.contains("active")) {
        collapse();
        return;
      }

      // thu gọn mục menu mở rộng khác nếu tồn tại
      if (menu.querySelector(".active")) {
        collapse();
      }

      // mở rộng mục menu mới
      target.parentElement.classList.add("active");
      target.nextElementSibling.style.maxHeight =
        target.nextElementSibling.scrollHeight + "px";
    }
  });
  // Khi thay đổi kích thước cửa sổ
  window.addEventListener("resize", function () {
    if (
      this.innerWidth > menuCollapseBreakpoint &&
      menu.classList.contains("open")
    ) {
      toggleMenu();
    }
    if (
      this.innerWidth > menuCollapseBreakpoint &&
      menu.querySelector(".active")
    ) {
      collapse();
    }
  });
}
headerMenu();

/**
 * Trình chuyển đổi kiểu
 */
function styleSwitcherToggle() {
  const styleSwitcher = document.querySelector(".style-switcher");
  const styleSwitcherToggler = document.querySelector(
    ".js-style-switcher-toggler"
  );

  styleSwitcherToggler.addEventListener("click", function () {
    styleSwitcher.classList.toggle("open");
    this.querySelector("i").classList.toggle("fa-times");
    this.querySelector("i").classList.toggle("fa-cog");
  });
}
styleSwitcherToggle();
// Màu nền

function themeColors() {
  const colorStyle = document.querySelector(".js-color-style");
  themeColorsContainer = document.querySelector(".js-theme-colors");

  themeColorsContainer.addEventListener("click", ({ target }) => {
    if (target.classList.contains("js-theme-color-item")) {
      localStorage.setItem("color", target.getAttribute("data-js-theme-color"));
      setColor();
    }
  });
  function setColor() {
    let path = colorStyle.getAttribute("href").split("/");
    path = path.splice(0, path.length - 1);
    colorStyle.setAttribute(
      "href",
      path.join("/") + "/" + localStorage.getItem("color") + ".css"
    );
    if (document.querySelector(".js-theme-color-item.active")) {
      document
        .querySelector(".js-theme-color-item.active")
        .classList.remove("active");
    }
    document
      .querySelector(
        "[data-js-theme-color=" + localStorage.getItem("color") + "]"
      )
      .classList.add("active");
  }
  if (localStorage.getItem("color") !== null) {
    setColor();
  } else {
    const defaultColor = colorStyle
      .getAttribute("href")
      .split("/")
      .pop()
      .split(".")
      .shift();
    document
      .querySelector("[data-js-theme-color=" + defaultColor + "]")
      .classList.add("active");
    console.log(defaultColor);
  }
}
themeColors();

// Chế độ sáng và tối
function themeLightDark() {
  const darkModeCheckbox = document.querySelector(".js-dark-mode");

  darkModeCheckbox.addEventListener("click", function () {
    if (this.checked) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
    themeMode();
  });
  function themeMode() {
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.remove("t-dark");
    } else {
      document.body.classList.add("t-dark");
    }
  }
}
//
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("t-dark");
  const checkbox = document.getElementById("dark-mode");
  checkbox.checked = true;
}
themeLightDark();
/**
 * Hiệu ứng nền kính
 */
function themeGlassEffect() {
  const glassEffectCheckbox = document.querySelector(".js-glass-effect");
  const glassStyle = document.querySelector(".js-glass-style");

  glassEffectCheckbox.addEventListener("click", function () {
    if (this.checked) {
      localStorage.setItem("glass-effect", "true");
    } else {
      localStorage.setItem("glass-effect", "false");
    }
    glass();
  });
  function glass() {
    if (localStorage.getItem("glass-effect") === "true") {
      glassStyle.removeAttribute("disabled");
    } else {
      glassStyle.disabled = true;
    }
  }
  if (localStorage.getItem("glass-effect") !== null) {
    glass();
  }
  if (!glassStyle.hasAttribute("disabled")) {
    glassEffectCheckbox.checked = true;
  }
}
themeGlassEffect();
