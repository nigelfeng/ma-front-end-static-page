function getCardType(number) {
  if (!number) return "";

  // visa
  var re = new RegExp("^4");
  if (number.match(re) !== null) return "Visa";

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      number
    )
  )
    return "Mastercard";

  // AMEX
  re = new RegExp("^3[47]");
  if (number.match(re) !== null) return "AMEX";

  // Discover
  re = new RegExp(
    "^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)"
  );
  if (number.match(re) !== null) return "Discover";

  // Diners
  re = new RegExp("^36");
  if (number.match(re) !== null) return "Diners";

  // Diners - Carte Blanche
  re = new RegExp("^30[0-5]");
  if (number.match(re) !== null) return "Diners - Carte Blanche";

  // JCB
  re = new RegExp("^35(2[89]|[3-8][0-9])");
  if (number.match(re) !== null) return "JCB";

  // Visa Electron
  re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
  if (number.match(re) !== null) return "Visa Electron";

  return "";
}

$(function () {
  $(document).foundation();

  validation();

  var $slider = $("#11723_carousel");

  $slider.slick({
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    dots: false,
    fade: false,
    infinite: true,
    vertical: false,
    verticalSwiping: false,
  });

  // mini-cart
  $(".toggle-cart").on("click", function () {
    $(".off-canvas.position-right").foundation("toggle");
  });

  $(".product-slider").slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    speed: 3,
    infinite: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $("#recent-slider").slick({
    speed: 300,
    dots: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    lazyLoad: "ondemand",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  var $responsiveImages = $slider.find("img[data-responsive-images]");
  if ($responsiveImages.length) {
    $slider.hide();
    $responsiveImages.each(function () {
      $(this).attr("data-interchange", $(this).data("responsiveImages"));
    });
    $slider.foundation().show().resize();
  }

  //checkout
  $(document).on(
    "change",
    "input[name^=shippingOption][value=Store]",
    function () {
      $(".reveal-overlay").show();
    }
  );

  $(document).on("click", ".reveal-overlay .close-button", function () {
    $(".reveal-overlay").hide();
  });

  $(document).on(
    "click",
    ".large.has-tip.bottom.ae-button, .save-list-btn",
    function (e) {
      $(".reveal-overlay.save-list").show();
      e.preventDefault();
    }
  );

  $(document).on(
    "click",
    ".callout.background-secondary .link.ae-button",
    function (e) {
      $(".reveal-overlay.store-available").show();
      e.preventDefault();
    }
  );

  $(document).on("change", "input[name=action][type=radio]", function (e) {
    if (e.target.checked && e.target.value === "C") {
      $("#savelist-existing").hide();
      $("#savelist-new").show();
    } else {
      $("#savelist-existing").show();
      $("#savelist-new").hide();
    }
  });

  $(document).on("click", ".brand-list-content .brands-toggle", function () {
    var $this = $(this);
    var TEXT = {
      showLess: "Show Less",
      showMore: "Show More",
    };
    if ($this.text() === TEXT.showMore) {
      $(this).text(TEXT.showLess);
      $(this).closest(".brand-list-content").addClass("show-all");
    } else if ($this.text() === TEXT.showLess) {
      $(this).text(TEXT.showMore);
      $(this).closest(".brand-list-content").removeClass("show-all");
    }
  });

  $(document).on("change", "select[name=department]", function () {
    $("select[name=topic]")
      .closest(".end")
      .css("display", $(this).val() ? "block" : "none");
  });

  $(document).on("change", "[name=isFindSchoolOrQuickCode]", function (e) {
    if (e.target.checked && e.target.value === "School") {
      $("form[name=findSchoolForm]").show();
      $("form[name=findQuickCodeForm]").hide();
    } else if (e.target.checked && e.target.value === "QuickCode") {
      $("form[name=findSchoolForm]").hide();
      $("form[name=findQuickCodeForm]").show();
    }
  });
  $(document).on("change", "[name=SchoolType]", function () {
    var value = $("[name=SchoolType]:checked").val();

    var $zipCodeOrQuickCode = $(
      "[name=findSchoolForm] [name=ZipCodeOrQuickCode]"
    ).parent();
    var $StudentGrade = $("[name=findSchoolForm] [name=StudentGrade]").parent();
    var $schoolName = $("[name=findSchoolForm] [name=schoolName]").parent();

    if (value === "Traditional") {
      $zipCodeOrQuickCode.show();
      $StudentGrade.show();
      $schoolName.show();
    } else if (value === "HomeSchool") {
      $zipCodeOrQuickCode.show();
      $StudentGrade.show();
      $schoolName.hide();
    } else if (value === "NotApplicable") {
      $zipCodeOrQuickCode.show();
      $StudentGrade.hide();
      $schoolName.hide();
    }
  });
});

function validation() {
  $(document).on("change", "form select, form :checkbox", function () {
    $(this).valid(this);
  });

  $.validator.setDefaults({
    errorClass: "input-validation-error",
    errorPlacement: function (error, element) {
      error.addClass("field-validation-error").appendTo(element.parent());
    },
    onfocusout: function (element) {
      this.element(element);
    },
    debug: true,
  });

  $.extend($.validator.messages, {
    required: "REQUIRED",
    phoneNumber: "MUST BE A VALID 10 DIGIT PHONE NUMBER",
    newPassword:
      '<div class="field-validation-error-inset">' +
      "Password must be between 8 and 50 characters in length.<br>" +
      "Password must contain at least 3 of the following 4 character groups:<br>" +
      "Lowercase alphabetic (a through z)<br>" +
      "Uppercase alphabetic (A through Z)<br>" +
      "Numerals (0 through 9)<br>" +
      "Non-alphabetic characters (such as !, @, #, $)" +
      "</div>",
    reenterPassword: "PASSWORDS MUST MATCH",
    emailForNewsletter: "A VALID EMAIL ADDRESS IS REQUIRED",
    email: "A VALID EMAIL ADDRESS IS REQUIRED",
    phone: "MUST BE A VALID 10 DIGIT PHONE NUMBER",
    postalCode: "INVALID ZIPCODE",
    cardNumber: "INVALID CARD NUMBER",
  });

  $("form[name=subscribeEmail]").validate({
    rules: {
      emailForNewsletter: {
        MAEmail: true,
        email: false,
        required: true,
      },
    },
    messages: {
      emailForNewsletter: "A VALID EMAIL ADDRESS IS REQUIRED",
    },
  });

  $("form[name=editNameForm]").validate({
    rules: {
      name: {
        required: true,
      },
    },
  });

  $("#shoppingListSearchForm").validate({
    rules: {
      lastNameOrEmail: "required",
    },
  });

  $("form[name=addEditPaymentMethodForm]").each(function (index, el) {
    var $year = $("select[name=bankCardYear]", el);
    var $month = $("select[name=bankCardMonth]", el);

    var shouldTriggerValid = function (element) {
      var $element = $(element);
      var triggered = $element.data("triggered");
      if (triggered) {
        $element.data("triggered", false);
        return false;
      } else {
        $element.data("triggered", true);
        return true;
      }
    };

    $(el).validate({
      rules: {
        cardNumber: {
          required: true,
          maxlength: 16,
          cardNumber: true,
        },
        cardHolder: "required",
        bankCardYear: {
          required: true,
          cardExpired: {
            param: function () {
              return {
                month: $month.val(),
                year: $year.val(),
              };
            },
            depends: function (element) {
              var shouldValid = $month.val() && $year.val();
              shouldValid && shouldTriggerValid(element) && $month.valid();
              return shouldValid;
            },
          },
        },
        bankCardMonth: {
          required: true,
          cardExpired: {
            param: function () {
              return {
                month: $month.val(),
                year: $year.val(),
              };
            },
            depends: function (element) {
              var shouldValid = $month.val() && $year.val();
              shouldValid && shouldTriggerValid(element) && $year.valid();
              return shouldValid;
            },
          },
        },
      },

      messages: {
        cardNumber: {
          maxlength: "NUMBER TOO LONG",
        },
        bankCardYear: {
          cardExpired: "",
        },
        bankCardMonth: {
          cardExpired: "CARD EXPIRATION DATE IS INVALID",
        },
      },
    });
  });

  $("form[name=contactUsForm]").validate({
    rules: {
      department: "required",
      comments: "required",
      topic: "require",
    },
  });

  $("form[name=accountInfoForm]").validate({
    rules: {
      firstName: "required",
      lastName: "required",
      phoneNumber: {
        required: false,
        phoneNumber: true,
      },
      currentPassword: {
        require: false,
        password: false,
      },

      newPassword: {
        required: false,
        password: true,
      },
      reenterPassword: {
        equalTo: "#newPassword",
      },
    },
    messages: {
      newPassword:
        '<div class="field-validation-error-inset">' +
        "Password must be between 8 and 50 characters in length.<br>" +
        "Password must contain at least 3 of the following 4 character groups:<br>" +
        "Lowercase alphabetic (a through z)<br>" +
        "Uppercase alphabetic (A through Z)<br>" +
        "Numerals (0 through 9)<br>" +
        "Non-alphabetic characters (such as !, @, #, $)" +
        "</div>",
      reenterPassword: "PASSWORDS MUST MATCH",
    },
  });

  $("form[name=addEditAddressForm]").each(function (index, el) {
    $(el).validate({
      rules: {
        firstName: "required",
        lastName: "required",
        address1: "required",
        city: "required",
        state: "required",
        zipCode: {
          required: true,
          postalCode: true,
        },
        email: {
          MAEmail: true,
          email: false,
          required: true,
        },
        phone: {
          required: true,
          phoneNumber: true,
        },
        currentPassword: false,
        newPassword: {
          required: false,
          password: true,
        },
        reenterPassword: {
          equalTo: "#newPassword",
        },
      },
      messages: {
        email: "A VALID EMAIL ADDRESS IS REQUIRED",
      },
    });
  });

  $("form[name=findQuickCodeForm]").validate({
    rules: {
      ZipCodeOrQuickCode: {
        required: true,
        ZipCodeOrQuickCode: true,
      },
      StudentGrade: "required",
    },
    messages: {
      ZipCodeOrQuickCode: "INVALID QUICK CODE",
    },
    errorPlacement: function (error, element) {
      error.addClass("field-validation-error").insertAfter(element);
    },
  });

  (function () {
    var $form = $("form[name=findSchoolForm]:eq(0)");

    $form.validate({
      rules: {
        ZipCodeOrQuickCode: {
          required: false,
          findSchoolFormZipCode: true,
        },
        StudentGrade: {
          required: function () {
            return (
              ["HomeSchool", "Traditional"].indexOf(
                $("[name=SchoolType]:checked", $form).val()
              ) > -1
            );
          },
        },
      },
      messages: {
        ZipCodeOrQuickCode: "INVALID QUICK CODE",
      },
      errorPlacement: function (error, element) {
        error.addClass("field-validation-error").insertAfter(element);
      },
    });
  })();

  $("form[name=findSchoolForm]:eq(1)").validate({
    rules: {
      ZipCodeOrQuickCode: {
        required: false,
        findSchoolFormZipCode: true,
      },
      MileRadius: "required",
      StudentGrade: "required",
    },
    messages: {
      ZipCodeOrQuickCode: "required",
    },
    errorPlacement: function (error, element) {
      error
        .addClass("field-validation-error")
        .css("marginTop", "-1rem")
        .appendTo(element.parent());
    },
  });

  $("form[name=renterDetailsForm]").validate({
    rules: {
      studentFirstName: "required",
      studentLastName: "required",
      renterFirstName: "required",
      renterLastName: "required",
      termsAndConditions: "required",
    },
    errorPlacement: function (error, element) {
      if (element.attr("name") === "termsAndConditions") {
        error
          .addClass("field-validation-error")
          .css("marginTop", "6px")
          .appendTo($("#errMsg_termsAndConditions"));
      } else {
        error.addClass("field-validation-error").appendTo(element.parent());
      }
    },
    messages: {
      termsAndConditions:
        "YOU MUST ACCEPT THE RENTAL TERMS AND CONDITIONS TO CONTINUE",
    },
  });

  $("form[name=findSchoolAltForm]").validate({
    rules: { SchoolType: "required" },
    messages: {
      SchoolType: " SELECT AN OPTION TO CONTINUE",
    },
    errorPlacement: function (error, element) {
      error
        .addClass("field-validation-error")
        .insertAfter(element.closest(".radio-list"));
    },
  });

  (function () {
    $("form[name=shipForm]:eq(1)").validate({
      rules: {
        firstName: "required",
        lastName: "required",
        line1: "required",
        city: "required",
        region: "required",
        postalCode: {
          required: true,
          postalCode: true,
        },
        phone: {
          required: true,
          phoneNumber: true,
        },
        email: {
          required: true,
          checkoutAdressEmail: true,
        },
      },
    });
  })();

  (function () {
    $("form[name=shipForm]:eq(2)").validate({
      rules: {
        firstName: "required",
        lastName: "required",
        phone: {
          required: true,
          phoneNumber: true,
        },
        email: {
          required: true,
          checkoutAdressEmail: true,
        },
      },
    });
  })();

  $("form[name=paymentForm]").each(function (index, el) {
    var $year = $("select[name=bankCardYear]", el);
    var $month = $("select[name=bankCardMonth]", el);

    var shouldTriggerValid = function (element) {
      var $element = $(element);
      var triggered = $element.data("triggered");
      if (triggered) {
        $element.data("triggered", false);
        return false;
      } else {
        $element.data("triggered", true);
        return true;
      }
    };

    $(el).validate({
      rules: {
        ccNumber: {
          required: true,
          maxlength: 16,
          cardNumber: {
            depends: function () {
              $("[name=bankCardCVV2]",el).val() && $("[name=bankCardCVV2]",el).valid();
              return true;
            },
          },
        },
        cardHolder: "required",
        bankCardYear: {
          required: true,
          cardExpired: {
            param: function () {
              return {
                month: $month.val(),
                year: $year.val(),
              };
            },
            depends: function (element) {
              var shouldValid = $month.val() && $year.val();
              shouldValid && shouldTriggerValid(element) && $month.valid();
              return shouldValid;
            },
          },
        },
        bankCardMonth: {
          required: true,
          cardExpired: {
            param: function () {
              return {
                month: $month.val(),
                year: $year.val(),
              };
            },
            depends: function (element) {
              var shouldValid = $month.val() && $year.val();
              shouldValid && shouldTriggerValid(element) && $year.valid();
              return shouldValid;
            },
          },
        },
        bankCardCVV2: {
          required: true,
          onlyNumber: true,
          cvvLengthCheck: {
            param: function () {
              var cardType = getCardType($("[name=ccNumber]", el).val());
              return cardType === "AMEX" ? 4 : 3;
            },
          },
          maxlength: 4,
        },
      },
      messages: {
        cardNumber: {
          maxlength: "NUMBER TOO LONG",
        },
        bankCardYear: {
          cardExpired: "",
        },
        bankCardMonth: {
          cardExpired: "CARD EXPIRATION DATE IS INVALID",
        },
        bankCardCVV2: function () {
          return "test";
        },
      },
    });
  });

  $("[name=billingAddressForm]").each(function (index, el){
    $(el).validate({
      rules: {
        firstName:"required",
        lastName:"required",
        line1:"required",
        city:"required",
        region:"required",
        postalCode:{
          require: true,
          postalCode: true,
        },
        phone: {
          required: true,
          phoneNumber: true,
        },
        email: {
          required: true,
          checkoutAdressEmail: true,
        },
      }
    })
  });
}
