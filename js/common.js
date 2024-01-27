/* GNB */
function gnb() {
  var $gnbDep1 = $(".gnb").children()
  var $gnbDep2 = $(".gnb .gnb-dep2")
  var $gnbLast = $(".gnb > li:last")
  //var $header = $('.header');
  var $gnbBg = $(".gnb-bg")

  var depth1 = function (e) {
    switch (e.type) {
      case "mouseenter":
      case "focusin":
        $gnbDep1.removeClass("on")
        //$gnbDep2.hide();
        $(this).find(".gnb-dep2").slideDown()
        $gnbBg.addClass("on")
        //$header.addClass('on');
        break
      case "focusout":
      case "mouseleave":
        $(this).removeClass("on")
        //$(this).find($gnbDep2).hide();
        $(this).find(".gnb-dep2").hide()
        $gnbBg.removeClass("on")
        //$header.removeClass('on');
        break
    }
  }
  $(document).on("mouseenter focusin mouseleave", ".gnb > li", depth1)
  $(document).on("focusout", ".gnb > li:last", depth1)
}

/*siteMap*/
function siteMap() {
  var sitemapOpen = function () {
    $(".sitemap-list").fadeIn()
  }
  var sitemapClose = function () {
    $(".sitemap-list").fadeOut()
  }
  $(document).on("click", ".sitemap-open", sitemapOpen)
  $(document).on("click", ".sitemap-close", sitemapClose)
}

/*body fix*/
var windowH = $(window).height()

function bodyFix() {
  $("body").css("overflow", "hidden")
}

function bodyAuto() {
  $("body").css("overflow", "auto")
}

/*top btn*/
function goTop() {
  var windowH = $(window).height()
  var goTopBtn = $(".btn-gotop")
  if ($(document).scrollTop() > windowH) {
    goTopBtn.css("position", "fixed")
  } else {
    goTopBtn.css("position", "absolute")
  }
  goTopBtn.on("click", function () {
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      500
    )
  })
}

/* Small Popup */
function smallPopup() {
  var smPopOpen = $(".sm-pop-open")
  var smPopClose = $(".sm-pop-close")
  smPopOpen.on("click", function () {
    $(".sm-pop-con").fadeOut()
    $(this).siblings().fadeIn()
  })
  smPopClose.on("click", function () {
    $(this).closest(".sm-pop-con").fadeOut()
  })
}

/*popup*/
function layerPopup() {
  var $this
  $(".pop-open-btn").on("click", function () {
    var modal = $(this).data("modal")
    // $("body").css("overflow", "hidden")
    $(modal).attr("tabindex", 0).show().focus()
    $this = $(this)
  })
  $(".popup-wrap .close").on("click", function () {
    $(this).closest(".popup-wrap").hide()
    $("body").css("overflow", "auto")
    //$this.focus();
  })
  $(".popup-wrap .focus-return").on("focus", function () {
    $(this).closest(".popup-wrap").attr("tabindex", 0).focus()
  })
}

/*family site*/
function familySite() {
  var fsBtn = $(".family-site button")
  fsBtn.on("click", function () {
    $(this).toggleClass("on")
    $(".family-site ul").slideToggle()
  })
  $("body").on("click", function (e) {
    if (!$(".family-site").has(e.target).length) {
      $(".family-site ul").slideUp()
      $(fsBtn).removeClass("on")
    }
  })
}

function Slider(slider, autoplay, autospeed, dots, arrows) {
  var slider = $("." + slider)
  slider.slick({
    slidesToShow: 1,
    autoplay: autoplay,
    autoplaySpeed: autospeed,
    dots: dots,
    arrows: arrows,
    infinite: true,
    fade: true,
    speed: 1000,
  })
}

/*drop toggle*/
function dropToggle() {
  var dropBtn = $(".drop .drop-btn")
  dropBtn.on("click", function () {
    $(this).toggleClass("on")
    $(this).closest(".drop").siblings().find(".drop-btn").removeClass("on")
    $(this).closest(".drop").siblings().find(".drop-list").slideUp()
    $(this).closest(".drop").find(".drop-list").slideToggle("fast")
  })
}

function checkAll() {
  $("#chk-chkAll").click(function () {
    $(".chk").prop("checked", this.checked)
  })
  $("#chk-chkAll-md").click(function () {
    $(".chk-md").prop("checked", this.checked)
  })

  $(".chk").click(function () {
    var total = $(".chk").length
    var checked = $(".chk:checked").length
    if (total != checked) {
      $("#chk-chkAll").prop("checked", false)
    }
  })

  $(".chk-md").click(function () {
    var total2 = $(".chk-md").length
    var checked2 = $(".chk-md:checked").length
    if (total2 != checked2) {
      $("#chk-chkAll-md").prop("checked", false)
    }
  })
}

function Sidebar() {
  var left = $(".dpth-2").width()
  var leftMg = $(".dpth-2").width() + $(".sidebar").width()

  $(".dpth-2").css("margin-left", -left) //초기 depth2 위치
  $(".page-content").css("width", "calc(100% - " + $("sidebar").width() + " )")
  $(".page-content").css("margin-left", $(".sidebar").width())

  $(".sidebar-nav>ul>li").click(function () {
    $(this).siblings().removeClass("on")
    $(this).toggleClass("on") //depth1 클릭시 하이라이트 적용되는 부분, 개발하면서 수정 필요

    $(".dpth-2").toggleClass("on")

    if ($(".dpth-2").hasClass("on")) {
      $(".dpth-2").css("margin-left", $(".sidebar").width())
      $(".page-content").css("margin-left", leftMg + 10)
      $(".main-inn .page-content").css("margin-left", leftMg + 60)
    } else {
      $(".dpth-2").css("margin-left", -left)
      $(".page-content").css("margin-left", $(".sidebar").width())
    }
  })

  $(".sub-nav a").click(function () {
    $(".sub-nav a").removeClass("on")
    $(this).toggleClass("on")
  })
}

function pageTab() {
  $(".page-tab div").click(function () {
    $(".page-tab div").removeClass("on")
    $(this).addClass("on")
  })
}
$(document).ready(function () {
  /*init*/
  gnb()
  Sidebar()
  window.addEventListener("resize", function () {
    Sidebar()
  })
  pageTab()
  siteMap()
  goTop()
  smallPopup()
  layerPopup()
  Slider("main-service-slide", true, 4000, true, false)
  Slider("main-banner-slide", true, 7000, false, true)
  Slider("main-board-slide", false, 3000, true, false)
  familySite()
  dropToggle()
  checkAll()
  new WOW().init()

  /*상단 데이터 검색창 돋보기 모양 클릭시 검색모달 뜸 */
  $(".page-top .ico-search").click(function () {
    $("#gbSearch").css("display", "block")
  })

  /*button change*/
  $(".value-ck").on("keyup", function () {
    $(".value-ck").each(function () {
      if (!$(this).val() == "") {
        $(this).siblings(".control-btn").show()
        $(this).siblings(".user-search").hide()
      } else {
        $(this).siblings(".control-btn").hide()
        $(this).siblings(".user-search").show()
      }
    })
  })

  /*webfont load*/
  //document.documentElement.classList.add('blocking-time');
  setTimeout(function () {
    $("body").css("opacity", "1")
  }, 500)

  /*scroll*/
  $(".scroll").overlayScrollbars({})

  $(".category-filter li")
    .not(".first")
    .click(function () {
      if ($(this).hasClass("on")) {
        $(this).removeClass("on")
      } else {
        $(this).addClass("on")
        $(".category-filter li").first().removeClass("on")
      }
    })

  $(".category-filter li")
    .first()
    .click(function () {
      if ($(this).hasClass("on")) {
        $(this).siblings.removeClass("on")
      } else {
        $(this).addClass("on")
        $(this).siblings().removeClass("on")
      }
    })
})
