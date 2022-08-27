(function($) {
    $(document).ready(function() {
        "use strict";

        // PRELOADER
        // loader()
        // function loader(_success) {
        // 	var obj = document.querySelector('.preloader'),
        // 	inner = document.querySelector('.inner .percentage'),
        // 	page = document.querySelector('body');
        // 	obj.classList.remove('page-loaded');
        // 	page.classList.add('page-loaded');
        // 	var w = 0,
        // 		t = setInterval(function() {
        // 			w = w + 1;
        // 			inner.textContent = w;
        // 			if (w === 100){
        // 				obj.classList.add('page-loaded');
        // 				page.classList.remove('page-loaded');
        // 				clearInterval(t);
        // 				w = 0;
        // 				if (_success){
        // 					return _success();
        // 				}
        // 			}
        // 		}, 20);
        // }

        // HAMBURGER AUDIO
        document
            .getElementById("hamburger-menu")
            .addEventListener("click", function(e) {
                document.getElementById("hamburger-hover").play();
            });

        // LOGO RANDOM FADE
        $(function() {
            // time between image rotate
            var delay = 3000;

            $(".logos ul > li figure").each(function() {
                // save images in an array
                var $imgArr = $(this).children();
                // show a random image
                $imgArr.eq(Math.floor(Math.random() * $imgArr.length)).show();
            });
            // run the changeImage function after every (delay) miliseconds
            setInterval(function() {
                changeImage();
            }, delay);

            function changeImage() {
                // save list items in an array
                var $liArr = $(".logos ul > li figure");
                // select a random list item
                var $currLi = $liArr.eq(Math.floor(Math.random() * $liArr.length));
                // get the currently visible image
                var $currImg = $("img:visible", $currLi);
                if ($currImg.next().length == 1) {
                    var $next = $currImg.next();
                } else {
                    var $next = $("img:first", $currLi);
                }
                $currImg.fadeOut(1500);
                $next.fadeIn(1500);
            }
        });

        // CONTACT FORM INPUT LABEL
        function checkForInput(element) {
            const $label = $(element).siblings("span");
            if ($(element).val().length > 0) {
                $label.addClass("label-up");
            } else {
                $label.removeClass("label-up");
            }
        }

        // The lines below are executed on page load
        $("input, textarea").each(function() {
            checkForInput(this);
        });

        // The lines below (inside) are executed on change & keyup
        $("input, textarea").on("change keyup", function() {
            checkForInput(this);
        });

        // SWIPER SLIDER 1
        var mySwiper = new Swiper(".swiper-container", {
            observeParents: true,
            observer: true,
            slidesPerView: "auto",
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                renderBullet: function(index, className) {
                    return (
                        '<span class="' +
                        className +
                        '"><svg><circle r="18" cx="20" cy="20"></circle></svg></span>'
                    );
                },
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });

        //added by mili
        //alert('before swiper update');
        var page = window.location.href;
        console.log(page);

        if (
            page == "http://stage.antino.io:81/index.html" ||
            page == "http://stage.antino.io:81" ||
            page == "http://127.0.0.1:5500/index.html" ||
            page == "http://127.0.0.1:5500"
        ) {
            console.log("Reload Swiper");
            mySwiper.update();
        }

        // PAGE TRANSITION
        $("body a:not([noAnimation])").on("click", function(e) {
            if (typeof $(this).data("fancybox") == "undefined") {
                e.preventDefault();
                var url = this.getAttribute("href");
                if (url.indexOf("#") != -1) {
                    var hash = url.substring(url.indexOf("#"));

                    if ($("body " + hash).length != 0) {
                        $(".transition-overlay").removeClass("active");
                        $(".hamburger").toggleClass("open");
                        //$("body").toggleClass("overflow");
                        $(".navigation-menu").removeClass("active");
                        $(".navigation-menu .inner ul").css("transition-delay", "0s");
                        $(".navigation-menu .inner blockquote").css(
                            "transition-delay",
                            "0s"
                        );
                        $(".navigation-menu .bg-layers span").css(
                            "transition-delay",
                            "0.3s"
                        );

                        $("html, body").animate({
                                scrollTop: $(hash).offset().top,
                            },
                            1000
                        );
                    }
                } else {
                    $(".transition-overlay").toggleClass("active");
                    setTimeout(function() {
                        window.location = url;
                    }, 600);
                }
            }
        });

        // GO TO TOP
        $(window).scroll(function() {
            if ($(this).scrollTop() > 300) {
                $(".gotop").fadeIn();
            } else {
                $(".gotop").fadeOut();
            }
        });

        $(".gotop").on("click", function(e) {
            $("html, body").animate({
                    scrollTop: 0,
                },
                600
            );
            return false;
        });

        // STICKY SIDE LOGO
        $(window).on("scroll touchmove", function() {
            $(".logo").toggleClass("sticky", $(document).scrollTop() > 300);
        });

        // HIDE NAVBAR
        $(window).on("scroll touchmove", function() {
            $(".navbar").toggleClass("hide", $(document).scrollTop() > 30);
        });

        // DATA BACKGROUND IMAGE
        var pageSection = $(".swiper-slide");
        pageSection.each(function(indx) {
            if ($(this).attr("data-background")) {
                $(this).css(
                    "background-image",
                    "url(" + $(this).data("background") + ")"
                );
            }
        });

        // HAMBURGER
        $(function() {
            var $burger = $(".burger");
            var $bars = $(".burger-svg__bars");
            var $bar = $(".burger-svg__bar");
            var $bar1 = $(".burger-svg__bar-1");
            var $bar2 = $(".burger-svg__bar-2");
            var $bar3 = $(".burger-svg__bar-3");
            var isChangingState = false;
            var isOpen = false;
            var burgerTL = new TimelineMax();

            function burgerOver() {
                if (!isChangingState) {
                    burgerTL.clear();
                    if (!isOpen) {
                        burgerTL
                            .to($bar1, 0.5, {
                                y: -2,
                                ease: Elastic.easeOut
                            })
                            .to(
                                $bar2,
                                0.5, {
                                    scaleX: 0.6,
                                    ease: Elastic.easeOut,
                                    transformOrigin: "50% 50%",
                                },
                                "-=0.5"
                            )
                            .to($bar3, 0.5, {
                                y: 2,
                                ease: Elastic.easeOut
                            }, "-=0.5");
                    } else {
                        burgerTL
                            .to($bar1, 0.5, {
                                scaleX: 1.2,
                                ease: Elastic.easeOut
                            })
                            .to($bar3, 0.5, {
                                scaleX: 1.2,
                                ease: Elastic.easeOut
                            }, "-=0.5");
                    }
                }
            }

            function burgerOut() {
                if (!isChangingState) {
                    burgerTL.clear();
                    if (!isOpen) {
                        burgerTL
                            .to($bar1, 0.5, {
                                y: 0,
                                ease: Elastic.easeOut
                            })
                            .to(
                                $bar2,
                                0.5, {
                                    scaleX: 1,
                                    ease: Elastic.easeOut,
                                    transformOrigin: "50% 50%",
                                },
                                "-=0.5"
                            )
                            .to($bar3, 0.5, {
                                y: 0,
                                ease: Elastic.easeOut
                            }, "-=0.5");
                    } else {
                        burgerTL
                            .to($bar1, 0.5, {
                                scaleX: 1,
                                ease: Elastic.easeOut
                            })
                            .to($bar3, 0.5, {
                                scaleX: 1,
                                ease: Elastic.easeOut
                            }, "-=0.5");
                    }
                }
            }

            function showCloseBurger() {
                burgerTL.clear();
                burgerTL
                    .to($bar1, 0.3, {
                        y: 6,
                        ease: Power4.easeIn
                    })
                    .to($bar2, 0.3, {
                        scaleX: 1,
                        ease: Power4.easeIn
                    }, "-=0.3")
                    .to($bar3, 0.3, {
                        y: -6,
                        ease: Power4.easeIn
                    }, "-=0.3")
                    .to($bar1, 0.5, {
                        rotation: 45,
                        ease: Elastic.easeOut,
                        transformOrigin: "50% 50%",
                    })
                    .set($bar2, {
                        opacity: 0,
                        immediateRender: false
                    }, "-=0.5")
                    .to(
                        $bar3,
                        0.5, {
                            rotation: -45,
                            ease: Elastic.easeOut,
                            transformOrigin: "50% 50%",
                            onComplete: function() {
                                isChangingState = false;
                                isOpen = true;
                            },
                        },
                        "-=0.5"
                    );
            }

            function showOpenBurger() {
                burgerTL.clear();
                burgerTL
                    .to($bar1, 0.3, {
                        scaleX: 0,
                        ease: Back.easeIn
                    })
                    .to($bar3, 0.3, {
                        scaleX: 0,
                        ease: Back.easeIn
                    }, "-=0.3")
                    .set($bar1, {
                        rotation: 0,
                        y: 0
                    })
                    .set($bar2, {
                        scaleX: 0,
                        opacity: 1
                    })
                    .set($bar3, {
                        rotation: 0,
                        y: 0
                    })
                    .to($bar2, 0.5, {
                        scaleX: 1,
                        ease: Elastic.easeOut
                    })
                    .to($bar1, 0.5, {
                        scaleX: 1,
                        ease: Elastic.easeOut
                    }, "-=0.4")
                    .to(
                        $bar3,
                        0.5, {
                            scaleX: 1,
                            ease: Elastic.easeOut,
                            onComplete: function() {
                                isChangingState = false;
                                isOpen = false;
                            },
                        },
                        "-=0.5"
                    );
            }

            $burger.on("click", function(e) {
                $("body").toggleClass("overflow");
                $(".navigation-menu").toggleClass("active");
                $(".navbar").toggleClass("light");
                if (!isChangingState) {
                    isChangingState = true;

                    if (!isOpen) {
                        showCloseBurger();
                    } else {
                        showOpenBurger();
                    }
                }
            });

            $burger.hover(burgerOver, burgerOut);
        });

        // MASONRY
        var $container = $(".works ul").imagesLoaded(function() {
            $container.isotope({
                itemSelector: ".works ul li",
                layoutMode: "masonry",
            });
        });
    });

    // SCROLL BG COLOR
    $(window)
        .scroll(function() {
            var $window = $(window),
                $body = $("body"),
                $panel = $("section, footer, header");

            var scroll = $window.scrollTop() + $window.height() / 3;

            $panel.each(function() {
                var $this = $(this);
                if (
                    $this.position().top <= scroll &&
                    $this.position().top + $this.height() > scroll
                ) {
                    $body.removeClass(function(index, css) {
                        return (css.match(/(^|\s)color-\S+/g) || []).join(" ");
                    });

                    $body.addClass("color-" + $(this).data("color"));
                }
            });
        })
        .scroll();

    // WOW ANIMATION
    wow = new WOW({
        animateClass: "animated",
        offset: 50,
    });
    wow.init();

    // COUNTER
    $(document).scroll(function() {
        $(".odometer").each(function() {
            var parent_section_postion = $(this).closest("section").position();
            var parent_section_top = parent_section_postion.top;
            if ($(document).scrollTop() > parent_section_top - 300) {
                if ($(this).data("status") == "yes") {
                    $(this).html($(this).data("count"));
                    $(this).data("status", "no");
                }
            }
        });
    });
})(jQuery);

//Open links in new tab
function handleSocialLink(obj) {
    var social_media = obj.getAttribute("data-social-media");
    switch (social_media) {
        case "instagram":
            window.open("https://www.instagram.com/antinolabs/");
            break;

        case "facebook":
            window.open("https://www.facebook.com/antinolabsindia/");
            break;

        case "linkedin":
            window.open("https://www.linkedin.com/company/antino-labs/");
            break;

        case "twitter":
            window.open("https://twitter.com/AntinoLabs");
            break;
    }
}

function handleLinkedInLinks(obj) {
    var linkedin_link = obj.getAttribute("data-linkedin-link");
    window.open(linkedin_link);
}
//Open App Links in new tab
function handleAppStore(obj) {
    var store_link = obj.getAttribute("data-store_link");
    window.open(store_link);
}

function handleCareersLink(obj) {
    var careers_link = obj.getAttribute("data-careers-link");
    window.open(careers_link);
}

function handleContactInfo(obj) {
    var contact_link = obj.getAttribute("data-contact_info");
    window.open(contact_link, "_self");
}

function displayFloatingLabels(obj) {
    var id = obj.id;
    $("#" + id).addClass("focus-visible");
    $("#" + id).attr("data-focus-visible-added");
}

/*function sendMail()
{
	var name = $('#name').val();
	var email = $('#email').val();
	var message = $('#message').val();
	var subject = $('#subject').val();

	var email_body = `You have received a new message.
	Here are the details:
	Name:  ${name}
	Email: ${email}
	Message : ${message}`;
	Email.send({ 
		SecureToken :"40c740df-6674-4ad4-8730-8d2bf5ef82a8",
        To: 'marionbelmont8412@gmail.com', 
        From: "emailverifymili@gmail.com", 
        Subject: "Contact form submission: " + name , 
		Body: email_body, 
		Port:587,
		useDefaultCredentials:false,

      }) 
        .then(function (message) { 
			  //alert("mail sent successfully") 
			  if(message == "OK")
			  {
				  $('#contact').css('display','none');
				  $('#success').css('display','block');
				  $('#error').css('display','none');
			  }
			  else
			  {
				$('#error').css('display','block');
				$('#success').css('display','none');
			  }
        }); 
}*/

document.addEventListener("DOMContentLoaded", function() {
    new IOlazy();
});

function hideTabs() {
    $("#v-pills-android").addClass("d-none");
    $("#v-pills-ios").addClass("d-none");
    //$("#v-pills-react").addClass("d-none");
    $("#v-pills-python").addClass("d-none");
    $("#v-pills-means").addClass("d-none");
    $("#v-pills-business").addClass("d-none");
}

function handleTabClick(obj) {
    // var id = obj.getAttribute("id");
    // console.log(id);
    // switch (id) {
    //   case "v-pills-android-tab":
    //     hideTabs();
    //     $("#v-pills-android").removeClass("d-none");
    //     $("#v-pills-android").removeClass("hide");
    //     break;
    //   case "v-pills-ios-tab":
    //     hideTabs();
    //     $("#v-pills-ios").removeClass("d-none");
    //     $("#v-pills-ios").removeClass("hide");
    //     break;
    //   case "v-pills-react-tab":
    //     $("#v-pills-react").removeClass("d-none");
    //     $("#v-pills-react").removeClass("hide");
    //     hideTabs();
    //     break;
    //   case "v-pills-python-tab":
    //     hideTabs();
    //     $("#v-pills-python").removeClass("d-none");
    //     $("#v-pills-python").removeClass("hide");
    //     break;
    //   case "v-pills-means-tab":
    //     hideTabs();
    //     $("#v-pills-means").removeClass("d-none");
    //     $("#v-pills-means").removeClass("hide");
    //     break;
    //   case "v-pills-business-tab":
    //     hideTabs();
    //     $("#v-pills-business").removeClass("d-none");
    //     $("#v-pills-business").removeClass("hide");
    //     break;
    // }
}
// MODAL
function openForm() {
    document.getElementById("myForm").style.display = "flex";

}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
// CRM
function disableSubmitwhileReset4873289000000737242() {
    var submitbutton = document.getElementById("formsubmit4873289000000737242");
    if (
        document.getElementById("privacyTool4873289000000737242") !== null ||
        document.getElementById("consentTool") !== null
    ) {
        submitbutton.disabled = true;
        submitbutton.style.opacity = "0.5;";
    } else {
        submitbutton.removeAttribute("disabled");
    }
}


function checkMandatory4873289000000737242() {
    var mndFields = new Array("Last Name", "Email");
    var fldLangVal = new Array("Name", "Email");
    var i;
    var mndFieldslength = mndFields.length;
    var fieldObj;
    for (i = 0; i < mndFieldslength; i++) {
        fieldObj =
            document.forms.BiginWebToContactForm4873289000000737242[mndFields[i]];
        if (fieldObj) {
            if (fieldObj.value.replace(/^s+|s+$/g, "").length === 0) {
                if (fieldObj.type === "file") {
                    alert("Please select a file to upload.");
                    fieldObj.focus();
                    return false;
                }
                alert(fldLangVal[i] + " cannot be empty.");
                fieldObj.focus();
                return false;
            } else if (fieldObj.nodeName === "SELECT") {
                if (fieldObj.options[fieldObj.selectedIndex].value === "-None-") {
                    alert(fldLangVal[i] + " cannot be none.");
                    fieldObj.focus();
                    return false;
                }
            } else if (fieldObj.type === "checkbox") {
                if (fieldObj.checked === false) {
                    alert("Please accept " + fldLangVal[i]);
                    fieldObj.focus();
                    return false;
                }
            }
            if (fieldObj.name === "Last Name" && fieldObj.value) {
                name = fieldObj.value;
            }
        }
    }
    return true;
}

function validateFileUpload() {
    var e = document.getElementById("theFile"),
        t = 0;
    if (e) {
        if (e.files.length > 3)
            return alert("You can upload a maximum of three files at a time."), !1;
        if ("files" in e) {
            var i = e.files.length;
            if (0 !== i) {
                for (var o = 0; o < i; o++) {
                    var a = e.files[o];
                    "size" in a && (t += a.size);
                }
                if (t > 20971520)
                    return alert("Total file(s) size should not exceed 20MB."), !1;
            }
        }
    }
    return !0;
}