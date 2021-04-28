//Check all exist
function allExist(el) {
  var exist = true
  k = document.querySelectorAll(el)
  for (var i = 0;i < k.length;i++) {
    if (k[i] == null) {
      exist = false
      return exist
    } else {
      // exist = true
      return exist
    }
  }
}

//Check one exist
function oneExist(el) {
  var exist = true
  k = document.querySelectorAll(el)
  for (var i = 0;i < k.length;i++) {
    if (k[i] != null) {
      return exist
    } else {
      exist = false
      return exist
    }
  }
}

//Show
function show(el) {
  var target = document.querySelector(el)
  // target.style.display = "block";
  target.style.setProperty('display', 'block', 'important')
}

//Hide
function hide(el) {
  var target = document.querySelector(el)
  // target.style.display = "none";
  target.style.setProperty('display', 'none', 'important')
}

//Add Class to all
function AddClass(el, className) {
  var _el = document.querySelectorAll(el)
  for (var i = 0;i < _el.length;i++) {
    _el[i].classList.add(className)
  }
}

//Remove Class to all
function RemoveClass(el, className) {
  var _el = document.querySelectorAll(el)
  for (var i = 0;i < _el.length;i++) {
    _el[i].classList.remove(className)
  }
}

//Remove & Add Class to all by selector
function RemoveAddClass(el, classRemove, classAdd) {
  var _el = document.querySelectorAll(el)
  for (var i = 0;i < _el.length;i++) {
    if (classRemove != '') {
      _el[i].classList.remove(classRemove)
    }
    if (classAdd != '') {
      _el[i].classList.add(classAdd)
    }
  }
}

//Remove & Add Class to all by element
function RemoveAddClassByElement(el, classRemove, classAdd) {
  // var _el = document.querySelectorAll(el)
  for (var i = 0;i < el.length;i++) {
    if (classRemove != '') {
      el[i].classList.remove(classRemove)
    }
    if (classAdd != '') {
      el[i].classList.add(classAdd)
    }
  }
}

//Remove & Add Class to all by element, only works on selector not object
function RemoveAddClassByArray(el, classRemove, classAdd) {
  // var _el = document.querySelectorAll(el)
  for (var i = 0;i < el.length;i++) {
    if (classRemove != '') {
      el[i].classList.remove(classRemove)
    }
    if (classAdd != '') {
      el[i].classList.add(classAdd)
    }
  }
}

//Remove all by selector
function removeAll(sel) {
  var target = document.querySelectorAll(sel)
  for (var i = 0;i < target.length;i++) {
    target[i].parentNode.removeChild(target[i])
  }
}

//Toggle Show/Hide by attribute - onclick="toggleShow(findChildren(findParent(this, 'LI', ''), '.detail'), 'hidden')"
//Or using "event.currentTarget" relpace the "thisElement": findParent(event, 'LI', '')
function toggleShow(event) {
  //if (elID.getAttribute("aria-hidden") == "true"))
  if (event.currentTarget.hasAttribute('hidden')) {
    event.currentTarget.removeAttribute('hidden')
  } else {
    event.currentTarget.setAttribute('hidden', true)
  }
}

//Toggle Show/Hide by attribute - onclick="toggleAllShow(findChildren(this, '.sort'));"
function toggleAllShow(allChildren) {
  //if (elID.getAttribute("aria-hidden") == "true"))
  console.log(allChildren.length)
  for (var i = 0;i < allChildren.length;i++) {
    if (allChildren[i].hasAttribute('hidden')) {
      allChildren[i].removeAttribute('hidden')
    } else {
      allChildren[i].setAttribute('hidden', true)
    }
  }
}

//toggle all class by selector
function toggleClass(el, cls) {
  var all = document.querySelectorAll(el)
  for (var i = 0;i < all.length;i++) {
    all[i].classList.toggle(cls)
  }
}

//toggle all class by array - onclick="toggleAllClass(findChildren(findParent(this, 'LI', ''), '.detail'), 'hidden'); return false;"
//return false - avoid the page jumping straight to the top"
function toggleAllClass(allChildren, cls1, cls2) {
  for (var i = 0;i < allChildren.length;i++) {
    allChildren[i].classList.toggle(cls1)
    if (cls2 != null) {
      allChildren[i].classList.toggle(cls2)
    }
  }
  // return false; //not working
}
//toggle two classes - onmouseover="removeAddClasses(findChildren(findParent(this, 'LI', ''), 'p'), 'uk-text-truncate', 'flex-wrap')" onmouseout="removeAddClasses(findChildren(findParent(this, 'LI', ''), 'p'), 'flex-wrap', 'uk-text-truncate')"
function removeAddClasses(allChildren, classRemove, classAdd) {
  for (var i = 0;i < allChildren.length;i++) {
    allChildren[i].classList.remove(classRemove)
    allChildren[i].classList.add(classAdd)
  }
}

//findParent(this, thisParentTagName, ''), the last variable is necessary
//Or using "event.currentTarget" relpace the "thisElement": findParent(event, 'LI', '')??
function findParent(thisElement, parentTagName, className) {
  if (className != '') {
    while (
      (thisElement = thisElement.parentElement) && !thisElement.classList.contains(className)
    );
    return thisElement
  } else {
    while (
      (thisElement = thisElement.parentElement) &&
      thisElement.tagName != parentTagName
    );
    //Searching loop only stop while parent is founded
    return thisElement //if searching no one will return null
  }
}

function findChildren(parentEL, sl) {
  return parentEL.querySelectorAll(sl)
}

function findFirstChild(parentEL) {
  return parentEL.firstElementChild
}

function findLastChild(parentEL) {
  return parentEL.lastElementChild
}

function findAll(sl) {
  return document.querySelectorAll(sl)
}

function findChild(parentEL, sl) {
  return parentEL.querySelector(sl)
  // return parentEL.querySelector(sl).tagName;
}

function findChildClass(parentEL, sl) {
  return parentEL.querySelector(sl).className
}

//get this year - <p onload="thisYear(this)"></p>
function thisYear(thisSelector) {
  var d = new Date()
  var y = d.getFullYear()
  document.querySelector(thisSelector).innerHTML = y
}

// onclick="plusHeight('.uk-table', findChild(findParent(this, 'DIV', ''), '[uk-dropdown]'))"
function plusHeight(sel, plusSelector) {
  var el1 = document.querySelector(sel)
  plusSelector.style.display = 'block'
  if (
    plusSelector.getBoundingClientRect().bottom >
    el1.getBoundingClientRect().bottom
  ) {
    var h = el1.getBoundingClientRect().height + plusSelector.getBoundingClientRect().bottom - el1.getBoundingClientRect().bottom
  } else {
    var h = el1.getBoundingClientRect().height
  }
  // var h = el1.clientHeight + plusSelector.getBoundingClientRect().bottom - el1.getBoundingClientRect().bottom;
  // console.log(el1.getBoundingClientRect().height)
  el1.style.height = h + 'px'
  plusSelector.style.display = 'inherit'
}

//onmouseover="viewHeight('[uk-dropdown]', 'nav.bg_primary')"
function viewMaxHeight(sel) {
  if (allExist(sel, upperSelector)) {
    var target = document.querySelectorAll(sel)
    // var alltops = document.querySelectorAll(sel).getBoundingClientRect().top
    for (var i = 0;i < target.length;i++) {
      target[i].style.maxHeight = window.innerHeight - target[i].getBoundingClientRect().top + 'px'
    }
  }
}

//onmouseover="viewHeight('[uk-dropdown]', 'nav.bg_primary')"
function viewHeight(sel, upperSelector) {
  if (allExist(sel, upperSelector)) {
    var topHeight =
      document.querySelector(upperSelector).getBoundingClientRect().top +
      document.querySelector(upperSelector).getBoundingClientRect().height
    var target = document.querySelectorAll(sel)
    for (var i = 0;i < target.length;i++) {
      target[i].style.maxHeight = window.innerHeight - topHeight + 'px'
    }
  }
}

//viewHeightMiddle(".uk-slideshow-items", "header", ".bg_bar") - uk-slideshow height, working with CSS: #slideshow .uk-slideshow-items {min-height: auto !important;}
//Subtracts the height of preceding and following element
function viewHeightMiddle(sel, upperSelector, lowerSelector) {
  if (allExist(sel, upperSelector, lowerSelector)) {
    var topHeight =
      document.querySelector(upperSelector).clientTop +
      document.querySelector(upperSelector).clientHeight
    var lowerHeight = document.querySelector(lowerSelector).clientHeight
    document.querySelector(sel).style.height =
      window.innerHeight - topHeight - lowerHeight + 'px' //CANNOT use "px !important"
  }
}

function sameHeight(sel, target1, target2) {
  if (allExist(sel, target1, target2)) {
    document.querySelector(sel).style.height =
      document.querySelector(target1).clientHeight +
      document.querySelector(target2).clientHeight +
      'px' //CANNOT use "px !important"
  }
}

//Triger Click event
function OnClick(el) {
  document.querySelector(el).click()
}

//------------- font resize ------------------------------------------------//
function fontResize(
  classFontM,
  classFontL,
  classButtonFont,
  classButtonFontS,
  classButtonFontM,
  classButtonFontL,
  classActive
) {
  if (
    document
      .querySelector('.' + classButtonFontS)
      .classList.contains(classActive)
  ) {
    document.querySelector('html').classList.remove(classFontM)
    document.querySelector('html').classList.remove(classFontL)
  }
  if (
    document
      .querySelector('.' + classButtonFontM)
      .classList.contains(classActive)
  ) {
    document.querySelector('html').classList.remove(classFontL)
    document.querySelector('html').classList.add(classFontM)
  }
  if (
    document
      .querySelector('.' + classButtonFontL)
      .classList.contains(classActive)
  ) {
    document.querySelector('html').classList.remove(classFontM)
    document.querySelector('html').classList.add(classFontL)
  }
  var btnFont = document.querySelectorAll('.' + classButtonFont)
  for (var i = 0;i < btnFont.length;i++) {
    btnFont[i].onclick = function () {
      RemoveClass('.' + classButtonFont, classActive) //Outer function
      this.classList.add(classActive) //Error: Cannot use 'btnFont[i]' to replace 'this'
      if (this.classList.contains(classButtonFontS)) {
        //Error: Cannot use 'buttonFontS' (it's a selector not the class name)
        document.querySelector('html').classList.remove(classFontM)
        document.querySelector('html').classList.remove(classFontL)
      }
      if (this.classList.contains(classButtonFontM)) {
        document.querySelector('html').classList.remove(classFontL)
        document.querySelector('html').classList.add(classFontM)
      }
      if (this.classList.contains(classButtonFontL)) {
        document.querySelector('html').classList.remove(classFontM)
        document.querySelector('html').classList.add(classFontL)
      }
    }
  }
}
if (oneExist(".text_size") == true) {
  fontResize("text-m", "text-l", "text_size", "text_size-s", "text_size-m", "text_size-l", "active")
}
//------------- End font resize ------------------------------------------------//

//------------- Form ------------------------------------------------//

//select onchange Event - <select onchange="showOption()">
function showOption(event, index, sl) {
  var showEl = document.querySelectorAll(sl)
  var i
  if (event.currentTarget.selectedIndex == index) {
    for (i = 0;i < showEl.length;i++) {
      showEl[i].style.setProperty('display', 'block', 'important')
    }
  } else {
    for (i = 0;i < showEl.length;i++) {
      showEl[i].style.setProperty('display', 'none', 'important')
    }
  }
}

//--Checkbox toggle check all - <input type="checkbox" onchange="toggleCheckAll(this, '.listCheck', '.checkAll', 'false')"> or <button onclick="toggleCheckAll(this, '.listCheck')">
// function toggleCheckAll(thisClick, inputCheck, checkAll, ifAddChecked) {
//   //thisClick means the "owner" and CANNOT use "this" that means the Global object "Window"
//   thisClick.classList.toggle('checked')
//   var inputCheck = document.querySelectorAll(inputCheck)
//   var checkAll = document.querySelectorAll(checkAll)
//   var ifAddChecked = ifAddChecked //ifAddChecked is boolean
//   //--set all input checked & unchecked--
//   if (thisClick.classList.contains('checked')) {
//     //if 'select all' checked
//     if (checkAll != null | checkAll != undefined) {
//       for (var i = 0;i < checkAll.length;i++) {
//         checkAll[i].checked = true
//         checkAll[i].classList.add('checked')
//       }
//     }
//     for (var i = 0;i < inputCheck.length;i++) {
//       inputCheck[i].checked = true
//       if (ifAddChecked == true) {
//         inputCheck[i].offsetParent.classList.add('checked')
//         //parent inputCheck<li> add class "checked" when input checked
//       }
//     }
//   } else {
//     //if 'select all' unchecked
//     if (checkAll != null | checkAll != undefined) {
//       for (var i = 0;i < checkAll.length;i++) {
//         checkAll[i].checked = false
//         checkAll[i].classList.remove('checked')
//       }
//     }
//     for (var i = 0;i < inputCheck.length;i++) {
//       inputCheck[i].checked = false
//       if (ifAddChecked == true) {
//         inputCheck[i].offsetParent.classList.remove('checked')
//         //parent inputCheck<li> remove class "checked" when input unchecked
//       }
//     }
//   }
// }

// checkedSum(".listCheck", ".checkAll", ".uncheckAll", ".checkedNumber")
// function checkedSum(inputCheck, checkAll, resetButton, textSum) {
//   var inputCheck = document.querySelectorAll(inputCheck)
//   var checkAll = document.querySelectorAll(checkAll)
//   var resetButton = document.querySelectorAll(resetButton)
//   var textSum = document.querySelectorAll(textSum)
//   var sum = 0
//   textSum.innerHTML = sum

//   for (var i = 0;i < inputCheck.length;i++) {
//     inputCheck[i].addEventListener('change', (event) => {
//       if (event.target.checked) {
//         sum = sum + 1
//         for (var j = 0;j < textSum.length;j++) {
//           textSum[j].innerHTML = sum
//         }
//       } else {
//         sum = sum - 1
//         for (var k = 0;k < textSum.length;k++) {
//           textSum[k].innerHTML = sum
//         }
//       }
//     })
//   }
//   for (var i = 0;i < checkAll.length;i++) {
//     if (checkAll[i].getAttribute('type') == 'checkbox') {
//       checkAll[i].addEventListener('change', (event) => {
//         if (event.target.checked) {
//           for (var i = 0;i < checkAll.length;i++) {
//             checkAll[i].checked = true
//           }
//           for (var j = 0;j < inputCheck.length;j++) {
//             inputCheck[j].checked = true
//             // sum = sum + 1
//           }
//           sum = inputCheck.length
//           for (var k = 0;k < textSum.length;k++) {
//             textSum[k].innerHTML = sum
//           }
//         } else {
//           for (var i = 0;i < checkAll.length;i++) {
//             checkAll[i].checked = false
//           }
//           for (var j = 0;j < inputCheck.length;j++) {
//             inputCheck[j].checked = false
//             // sum = sum - 1
//           }
//           sum = 0
//           for (var k = 0;k < textSum.length;k++) {
//             textSum[k].innerHTML = sum
//           }
//         }
//       })
//     }
//     if (checkAll[i].getAttribute('type') == 'button') {
//       checkAll[i].onclick = function () {
//         if (checkAll[i].classList.contains('checked')) {
//           for (var i = 0;i < checkAll.length;i++) {
//             checkAll[i].classList.toggle('checked')
//           }
//           for (var j = 0;j < inputCheck.length;j++) {
//             inputCheck[j].checked = true
//             // sum = sum + 1
//           }
//           sum = inputCheck.length
//           for (var k = 0;k < textSum.length;k++) {
//             textSum[k].innerHTML = sum
//           }
//         } else {
//           for (var i = 0;i < checkAll.length;i++) {
//             checkAll[i].classList.toggle('checked')
//           }
//           for (var j = 0;j < inputCheck.length;j++) {
//             inputCheck[j].checked = false
//             // sum = sum - 1
//           }
//           sum = 0
//           for (var k = 0;k < textSum.length;k++) {
//             textSum[k].innerHTML = sum
//           }
//         }
//       }
//     }
//   }
//   for (var i = 0;i < resetButton.length;i++) {
//     resetButton[i].onclick = function () {
//       for (var j = 0;j < checkAll.length;j++) {
//         checkAll[j].checked = false
//       }
//       for (var k = 0;k < inputCheck.length;k++) {
//         inputCheck[k].checked = false
//       }
//       sum = 0
//       for (var l = 0;l < textSum.length;l++) {
//         textSum[l].innerHTML = sum
//       }
//     }
//   }
// }
// if (allExist([".listCheck", ".checkAll", ".uncheckAll", ".checkedNumber"]) == true) {
//   checkedSum(".listCheck", ".checkAll", ".uncheckAll", ".checkedNumber")
// }
//------------- End Form ------------------------------------------------//

//------------- Table in editor ------------------------------------------------//
//Table width in editor
function tableWidth(el) {
  var target = document.querySelectorAll(el)
  if (window.innerWidth <= 959 || document.documentElement.clientWidth <= 959) {
    for (var i = 0;i < target.length;i++) {
      target[i].style.setProperty('width', '100%', 'important')
      if (target[i].getAttribute('width') != null) {
        target[i].setAttribute('width', 'auto')
      }
      var th = target[i].querySelectorAll('th')
      var td = target[i].querySelectorAll('td')
      for (var j = 0;j < th.length;j++) {
        if (th[j].style.width != null) {
          th[j].style.setProperty('width', 'auto', 'important')
        }
        if (th[j].getAttribute('width') != null) {
          th[j].setAttribute('width', 'auto')
        }
      }
      for (var k = 0;k < td.length;k++) {
        if (td[k].style.width != null) {
          td[k].style.setProperty('width', 'auto')
        }
        if (td[k].getAttribute('width') != null) {
          td[k].setAttribute('width', 'auto')
        }
      }
    }
    for (var i = 0;i < target.length;i++) {
      var columns = target[i].querySelector('thead tr').childElementCount
      // IF the columns of table is 6 or greater than 6, add the parent <div class="uk-overflow-auto">
      if (columns >= 6) {
        var parent = target[i].parentNode //Parent of the target
        var wrapper = document.createElement('div') // It's a method not element
        // set the wrapper as child (instead of the element)
        parent.replaceChild(wrapper, target[i])
        wrapper.classList.add('uk-overflow-auto')
        // set element as child of wrapper
        wrapper.appendChild(target[i])
        target[i].classList.add('scroll_table', 'min_width-600', 'min_width-700@s', 'min_width-1000@m')
      }
    }
  } else {
    for (var i = 0;i < target.length;i++) {
      if (target[i].getAttribute('width') >= target[i].parentElement.offsetWidth) {
        target[i].setAttribute('width', 'auto')
      }
    }
  }
}
if (oneExist('.ckeditor table')) {
  tableWidth('.ckeditor table')
}
//------------- End Table in editor ------------------------------------------------//

//------------- Uikit ------------------------------------------------//
// //Slideshow tab focus
// // Set <a href="https://www.google.com.tw/" onfocus="slideShowFocus('#slideshow', '#slideshow .uk-dotnav a', event)" onkeydown="enterOpenUrl('_blank', event)">Banner1</a> on <ul class="uk-dotnav">
// function slideShowFocus(slideshow, tabsArray, event) {
//   var slideshow = document.querySelector(slideshow)
//   var tabs = document.querySelectorAll(tabsArray)
//   for (var i = 0;i < tabs.length;i++) {
//     // tabs[i] = UIkit.slideshow(slideshow).show(i)
//     if (event.currentTarget == tabs[i]) {
//       UIkit.slideshow(slideshow).show(i)
//     }
//   }
// }
// //Click 'Enter' to open window by the attribute 'href'
// //Or using "event.currentTarget" relpace the "thisKeyDown"
// function enterOpenUrl(targetWindow, event) {
//   if (event.keyCode === 13) {
//     window.open(event.currentTarget.getAttribute('href'), targetWindow)
//   }
// }
// Set <a href="https://www.google.com.tw/" onfocus="slideShowFocus('#slideshow', '#slideshow .uk-dotnav a', this)" onkeydown="enterOpenUrl('_blank', this, event)">Banner1</a> on <ul class="uk-dotnav">
// function slideShowFocus(slideshow, tabsArray, thisFocus) {
//   var slideshow = document.querySelector(slideshow)
//   var tabs = document.querySelectorAll(tabsArray)
//   for (var i = 0;i < tabs.length;i++) {
//     // tabs[i] = UIkit.slideshow(slideshow).show(i)
//     if (thisFocus == tabs[i]) {
//       UIkit.slideshow(slideshow).show(i)
//     }
//   }
// }
// function enterOpenUrl(targetWindow, thisKeyDown, event) {
//   if (event.keyCode === 13) {
//     window.open(thisKeyDown.getAttribute('href'), targetWindow)
//   }
// }

//Uikit 3 load active tab (or with switcher) from url [[for another page]]. Usage: page.html#3
//https://www.w3schools.com/JSREF/prop_loc_hash.asp
function urlShowTab(ukTab) {
  var hash = document.location.hash
  if (hash && oneExist(ukTab) == true) {
    var index = hash.slice(1) - 1 //Extract string from the second position and to the end
    UIkit.tab(ukTab).show(index)
    // urlShowTab("#patinfo_tab")
    // console.log('li' + hash + '>a')
  }
}
//Click a link to show a uk-tab [[in the same page]] by the 'index'
function listShowTab(link, ukTab) {
  var links = document.querySelectorAll(link)
  for (var i = 0;i < links.length;i++) {
    links[i].onclick = function () {
      // const list = this.parentElement.parentElement.children
      // const index = list.indexOf(this.parentElement) //It got error
      //With ES6 destructuring you can do as below:
      var index = [...this.parentElement.parentElement.children].indexOf(this.parentElement)
      UIkit.tab(ukTab).show(index)
    }
  }
}
//The two functions below must be togther
// urlShowTab(".border2.uk-tab")
// listShowTab(".nav_bar .uk-dropdown .uk-nav-sub>li>a", ".border2.uk-tab")

// function uikitSvg(logoSvg) {
//   var logo = document.querySelector(logoSvg)
//   UIkit.svg(logo).svg.then(function (svg) {
//     svg.setAttribute("preserveAspectRatio", "xMinYMid")
//     // svg.querySelector('path').style.stroke = 'red'
//   })
// }
// window.onload = function () {
//   if (oneExist('.logo>img') == true) {
//     // console.log("The logo exists")
//     uikitSvg(".logo>img")
//   }
// }
//------------- End Uikit ------------------------------------------------//

//<a class="fontSize1 pb-1 uk-accordion-title" href="#" onclick="toggleAttr(event, '', 'title', '展開', '縮起')">
function toggleAttr(event, el, attr, val1, val2) {
  if (event.currentTarget.getAttribute(attr) == val1) {
    event.currentTarget.setAttribute(attr, val2)
    // console.log(event.currentTarget.getAttribute(attr))
  } else {
    event.currentTarget.setAttribute(attr, val1)
  }
  if (el != '') {
    var el = document.querySelectorAll(el)
    for (var i = 0;i < el.length;i++) {
      if (el.getAttribute(attr) == val1) {
        el.setAttribute(attr, val2)
      } else {
        el.setAttribute(attr, val1)
      }
    }
  }
}
function setAttr(el, attr) {
  var el = document.querySelectorAll(el)
  // var attrs = []
  for (var i = 0;i < el.length;i++) {
    el[i].setAttribute(attr[0], attr[1])
    console.log(el.length)
  }
}
// setAttr('[class*=fa-]', ["title", ""])

// Loading script
function loadScript(src, loading) {
  let script = document.createElement('script')
  script.src = src
  if (loading == 'async') {
    script.async = true
  }
  if (loading == 'defer') {
    script.defer = true
  }
  document.body.append(script)
}
// loadScript("/long.js");
// loadScript("/small.js");

//go to top
// function gotoTop(sl, classFadeName) {
//   var el = document.querySelector(sl)
//   // el.style.opacity = "0";
//   if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
//     el.classList.add(classFadeName)
//   } else {
//     el.classList.remove(classFadeName)
//   }
// }
// if (oneExist("#gototop") == true) {
//   gotoTop("#gototop", "tw-opacity-100")
//   window.onscroll = function () {
//     gotoTop("#gototop", "tw-opacity-100")
//   }
// }
//------------- End Functions ------------------------------------------------//

//------------- ES5/6 -------------//
//--------------------------------------------------------------------------------------------------------------------------//

// Regular functions
x = function () { return "Hello World!" }

// Arrow functions
x = () => { return "Hello World!" }
x = () => "Hello"
x = (v1, v2) => "Hello" + v1 + v2
x = (v) => "Hello" + v
x = v => "Hello" + v

// Wait for some time: setTimeout() function
setTimeout(() => {
  // some code
}, 300)

//Click Event for Multiple Elements
document.querySelectorAll('.some-class').forEach(item => {
  item.addEventListener('click', event => {
    //handle click
  })
})
// [document.querySelector('.a-class'), document.querySelector('.another-class')].forEach(item => {
//   item.addEventListener('click', event => {
//     //handle click
//   })
// })

// Event
// item.addEventListener('click', () => { })
// window.addEventListener('scroll', () => { })

/* https://jsfiddle.net/shen_yang_work/cu9834fr/ */
// function $$(elem) {
//   if (!(this instanceof $$)) {
//     return (new $$(elem))
//   } else {
//     this.elem = elem
//   }
// }
// $$.prototype = {
//   set: function (prop, value) {
//     this.elem[prop] = value
//     return (this)
//   }
// }
// $$(document.getElementById("example-element")).set("innerHTML", "xxxx").set("className", "test")

//------------- Start -------------//
//------------------------------------------------------------------------------------------------

//Check all exist
const allPresent = (el) => {
  // var exist = true
  // k = document.querySelectorAll(el)
  $all(el).forEach(item => {
    if (item == null) {
      return false
    } else {
      return true
    }
  })
  // for (var i = 0;i < k.length;i++) {
  //   if (k[i] == null) {
  //     exist = false
  //     return exist
  //   } else {
  //     // exist = true
  //     return exist
  //   }
  // }
}

//Check one exist
const onePresent = (el) => {
  // var exist = true
  // k = document.querySelectorAll(el)
  $all(el).forEach(item => {
    if (item != null) {
      return true
    } else {
      return false
    }
  })
  // for (var i = 0;i < k.length;i++) {
  //   if (k[i] != null) {
  //     return exist
  //   } else {
  //     exist = false
  //     return exist
  //   }
  // }
}

/* https://jsfiddle.net/shen_yang_work/0489wdn7/ */
const $all = (el) => document.querySelectorAll(el)

/* https://gomakethings.com/how-to-get-all-of-an-elements-siblings-with-vanilla-js/ */
const getSiblings = (el) => {
  el = document.querySelector(el)
  // for collecting siblings
  let siblings = []
  // if no parent, return no sibling
  if (!el.parentNode) {
    return siblings
  }
  // first child of the parent node
  let sibling = el.parentNode.firstChild

  // collecting siblings
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== el) {
      siblings.push(sibling)
    }
    sibling = sibling.nextSibling
  }
  return siblings
}
// const toggleClasses = (el, ...cls) => cls.map(cl => el.classList.toggle(cl)) // '...cls': Rest parameter must be last formal parameter
const toggleClasses = (el, classArray) => classArray.map(cl => el.classList.toggle(cl))
const accordion = (el) => {
  if (el.classList.contains('open')) {
    el.style.height = el.scrollHeight + "px"
    toggleClasses(el, ['accordion', 'accordioning'])
    setTimeout(() => {
      el.style.height = null
    }, 1)
    setTimeout(() => {
      toggleClasses(el, ['accordion', 'open', 'accordioning'])
    }, 201)
  } else {
    toggleClasses(el, ['accordion', 'accordioning'])
    el.style.height = el.scrollHeight + "px"
    // The scrollHeight property returns the entire height of an element in pixels, including padding, but not the border, scrollbar or margin.
    setTimeout(() => {
      toggleClasses(el, ['accordion', 'open', 'accordioning'])
      el.style.height = null
    }, 200)
  }
}
const eventToggleClasses = (eventTarget, event, selfToggleClassArray, accordionEl, eventTargetParent, parentToggleClassArray, inactiveParentSiblings, inactiveParentSiblingsChildern, toggleChild, childToggleClassArray) => {
  $all(eventTarget).forEach(item => {
    if (event != '') {
      item.addEventListener(event, event => {
        if (eventTargetParent != '') {

          if (inactiveParentSiblings != '') {
            // Remove the calss 'active' from all the same level parents
            item.closest(eventTargetParent).parentElement.querySelectorAll(eventTargetParent).forEach(item => {
              item.classList.remove(parentToggleClassArray)
            })
          }

          item.closest(eventTargetParent).querySelectorAll(toggleChild).forEach(item => {
            toggleClasses(item, childToggleClassArray)
          })

          if (accordionEl != '') {
            item.closest(eventTargetParent).querySelectorAll(accordionEl).forEach(item => {
              accordion(item)
            })
          }

          if (parentToggleClassArray != '') {
            toggleClasses(item.closest(eventTargetParent), parentToggleClassArray)
          }

          // If the arrow right is hidden when the menu is opened
          if (inactiveParentSiblings != '' && inactiveParentSiblingsChildern != '') {
            if (item.firstElementChild.classList.contains(childToggleClassArray) == true) {
              // Add the calss 'active' to parent
              item.closest(eventTargetParent).classList.add(parentToggleClassArray)
              // All inactive sibling parents
              item.closest(eventTargetParent).parentElement.querySelectorAll(inactiveParentSiblings).forEach(item => {
                // console.log(item)
                // Show Right arrow
                item.querySelector(inactiveParentSiblingsChildern).firstElementChild.classList.remove(childToggleClassArray)
                // Hide Down arrow
                item.querySelector(inactiveParentSiblingsChildern).lastElementChild.classList.add(childToggleClassArray)
                // Hide Contents
                item.lastElementChild.classList.add(childToggleClassArray)
              })
            } else {
              item.closest(eventTargetParent).classList.remove(parentToggleClassArray)
            }
          }
        } else {
          if (toggleChild != '') {
            item.querySelectorAll(toggleChild).forEach(item => {
              toggleClasses(item, childToggleClassArray)
            })
          }
          if (accordionEl != '') {
            item.querySelectorAll(accordionEl).forEach(item => {
              accordion(item)
            })
          }
        }
        if (selfToggleClassArray != '') {
          toggleClasses(item, selfToggleClassArray)
        }
        event.preventDefault() // prevent the page refreshing - https://www.w3schools.com/jsref/event_preventdefault.asp
      })
    }
  })
}
// eventToggleClasses('#offcanvas li>div>a:nth-child(2)', 'click', '', 'ul.toggle', 'li', '', '', '', '.toggle', ['tw-hidden']) // uk-offcanvas with accordion
eventToggleClasses('#offcanvas li>div>a:nth-child(2)', 'click', '', '', 'li.uk-parent', ['active'], '#offcanvas>div>ul>li.uk-parent:not(.active)', 'div>a:last-child', '.toggle', ['tw-hidden']) // uk-offcanvas opeing in turn
eventToggleClasses('.listMenu_titlelink li>div>div:nth-child(2)>a', 'click', '', '', 'li.uk-parent', ['active'], '.listMenu_titlelink>ul>li.uk-parent:not(.active)', 'div>div:last-child>a', '.toggle', ['tw-hidden']) // listMenu_titlelink opeing in turn
// eventToggleClasses('.listMenu_titlelink li a.listMore', 'click', '', '', 'ul', '', '', '', '.listMore', ['tw-hidden']) // .listMore
// eventToggleClasses('li.listMore>a', 'click', '', '', 'li.listMore', ['hidden'], '', '', '', ''); // list click 'more' to show
// eventToggleClasses('.list_accordion_bs .list-group-item-action', 'click', ['active'], 'ul.accordion', 'li', '', '', '.toggle', '', ['tw-hidden', 'active']);
// eventToggleClasses('.list_accordion_titlelink .list-group-item>div>a:nth-child(2)', 'click', '', 'ul.accordion', 'li', ['active'], '', '', '.toggle', ['tw-hidden']);
// eventToggleClasses('.list_accordion_bg .arrow', 'click', '', 'ul.accordion', 'li', '', '', '', '.toggle', ['tw-hidden']);

// const $all = (el) => document.querySelectorAll(el)
// const toggleClasses = (el, ...cls) => cls.map(cl => el.classList.toggle(cl)) // '...cls': Rest parameter must be last formal parameter
// const eventToggleClasses = (eventTarget, event, eventTargetParent, toggleChild, ...cls) => {
//   $all(eventTarget).forEach(item => {
//     item.addEventListener('click', event => {
//       if (eventTargetParent != '') {
//         item.closest(eventTargetParent).querySelectorAll(toggleChild).forEach(item => {
//           toggleClasses(item, ...cls)
//         })
//       } else {
//         item.querySelectorAll(toggleChild).forEach(item => {
//           toggleClasses(item, ...cls)
//         })
//       }
//     })
//   })
// }
// eventToggleClasses('.list-group-item', 'click', '', '.fas', 'fa-angle-right', 'fa-angle-down');
// eventToggleClasses('.list_accordion .arrow', 'click', 'li.py-1', '.toggle', 'tw-hidden');

const setMaxViewHeight = (el) => {
  $all(el).forEach(item => {
    item.style.maxHeight = window.innerHeight - item.getBoundingClientRect().top + 'px'
  })
}
const eventMaxViewHeight = (event_el, event, height_el) => {
  $all(event_el).forEach(item => {
    item.addEventListener(event, () => {
      $all(height_el).forEach(item => {
        item.style.maxHeight = window.innerHeight - item.getBoundingClientRect().top + 'px'
      })
    })
  })
}
eventMaxViewHeight('.mainmenu li>a', 'mouseover', '.mainmenu .uk-dropdown')
// eventMaxViewHeight('.mainmenu li>a', 'mouseover', '.mainmenu .dropdown')

/* global ResizeObserver - https://jsfiddle.net/shen_yang_work/bfejc082/ */
const roundedBorder = new ResizeObserver(entries => { // 'entries' can be any names like 'items'
  for (let entry of entries) {
    entry.target.style.borderRadius = Math.max(0, 250 - entry.getBoundingClientRect().width) + 'px'
    // entry.contentRect.width: No support on iOS Safari & Android Firefox
  }
})
// Only observe the 2nd box
// roundedBorder.observe(document.querySelector('.example-element'))

//go to top
const anchorSmoothScroll = (el) => {
  document.querySelectorAll('.nav__item a[href^="#"]').forEach(trigger => {
    trigger.onclick = function (e) {
      e.preventDefault()
      let hash = this.getAttribute('href')
      let target = document.querySelector(hash)
      let headerOffset = 100
      let elementPosition = target.offsetTop
      let offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  })
}
const scrollToTop = (amount) => {
  window.scrollTo({ // If the trigger is a #hash link: <a href="#">, then it's not working. So it needs to be <a href="javascript:void(0)">
    top: amount,
    behavior: 'smooth'
  })
}
const gotoTop = (el, addClassName, scollDownPX, scrollTopPX) => {
  $all(el).forEach(item => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > scollDownPX || document.documentElement.scrollTop > scollDownPX) {
        item.classList.add(addClassName)
      } else {
        item.classList.remove(addClassName)
      }
    })
    item.addEventListener('click', () => {
      scrollToTop(scrollTopPX)
    })
  })
}
gotoTop("#gototop", "tw-opacity-100", "50", "0")

//Set multiple attributes to element at once
//ES6 Helper function: The "key" can be replace with "x" or any var
const setAttributes = (el, attrs) => {
  Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]))
}
//Helper function
// function setAttributes(el, attrs) {
//   for (var key in attrs) {
//     el.setAttribute(key, attrs[key])
//   }
// }
// setAttributes(elem, {"src": "http://example.com/something.jpeg", "height": "100%"})

//Set multiple attributes to multiple elements: attrs={'attr':'attrValue', 'attr2':'attrValue2'}
const setAttrs = (el, attrs) => {
  document.querySelectorAll(el).forEach(key1 => Object.keys(attrs).forEach(key2 => key1.setAttribute(key2, attrs[key2])))
}
// setAttrs(".logo svg", { "preserveAspectRatio": "xMinYMid" })

//<a class="uk-accordion-title" href="#" onclick="toggleAttr(event, '', 'title', '展開', '縮起')">
const eventToggleAttr = (event_el, event, event_el_children, attr, val1, val2) => {
  $all(event_el).forEach(item => {
    item.addEventListener(event, () => {
      let attrVal = item.getAttribute(attr)
      if (val1 != '' && val2 != '') {
        item.setAttribute(attr, attrVal == val1 ? val2 : val1)
      }
      if (val1 == '' && val2 == '') {
        if (event_el_children != '') {
          item.querySelectorAll(event_el_children).forEach(item => {
            if (item.hasAttribute(attr)) {
              item.removeAttribute(attr)
            } else {
              item.setAttribute(attr, true)
            }
          })
        } else {
          if (item.hasAttribute(attr)) {
            item.removeAttribute(attr)
          } else {
            item.setAttribute(attr, true)
          }
        }
      }
    })
  })
}
setAttrs('.uk-accordion>li>a', { 'title': '展開' })
setAttrs('.uk-accordion>li.uk-open>a', { 'title': '縮起' })
eventToggleAttr('.uk-accordion>li>a', 'click', '', 'title', '展開', '縮起')
eventToggleAttr('a.sort', 'click', '.icon', 'hidden', '', '')

//------------- Form ------------------------------------------------//

const toggleCheckAll = (checkAll, checkAllEvent, toggleCheckClass, inputCheck, inputCheckParent, ifAddClass) => {
  // ifAddClass is boolean
  $all(checkAll).forEach(item => {
    if (checkAllEvent != '') {
      item.addEventListener(checkAllEvent, event => {
        event.target.classList.toggle(toggleCheckClass)
        if (event.target.classList.contains(toggleCheckClass)) {
          //if 'select all' checked
          event.target.checked = true
          if (ifAddClass == true) {
            event.target.classList.add(toggleCheckClass)
          }
          $all(inputCheck).forEach(item => {
            item.checked = true
            if (ifAddClass == true) {
              item.closest(inputCheckParent).classList.add(toggleCheckClass)
            }
          })
        } else {
          //if 'select all' unchecked
          event.target.checked = false
          if (ifAddClass == true) {
            event.target.classList.remove(toggleCheckClass)
          }
          $all(inputCheck).forEach(item => {
            item.checked = false
            if (ifAddClass == true) {
              item.closest(inputCheckParent).classList.remove(toggleCheckClass)
            }
          })
        }
      })
    }
  })
}
// toggleCheckAll('.checkAll', 'click', 'checked', '.listCheck', 'li', 'true')
toggleCheckAll('.checkAll', 'change', 'checked', '.listCheck', '', '')

// toggleCheckAllSum('.checkAll', 'click', 'checked', '.listCheck', 'change', 'li', 'true', '.uncheckAll', 'click', '.checkedSum')
const toggleCheckAllSum = (checkAllEl, checkAllEvent, toggleCheckClass, inputCheck, inputCheckEvent, inputCheckParent, ifAddClass, resetButton, resetButtonEvent, textSum) => {
  // var checkAllEl = document.querySelectorAll(checkAllEl)
  // var inputCheck = document.querySelectorAll(inputCheck)
  // var resetButton = document.querySelectorAll(resetButton)
  // var textSum = document.querySelectorAll(textSum)
  var sum = 0

  // $all(textSum).forEach(item => {
  //   item.innerHTML = sum
  // })

  const checkAll = () => {
    $all(checkAllEl).forEach(item => {
      item.classList.add('checked')
    })
    $all(inputCheck).forEach(item => {
      item.checked = true
      if (ifAddClass == true) {
        item.closest(inputCheckParent).classList.add(toggleCheckClass)
      }
    })
    if (textSum != '') {
      sum = $all(inputCheck).length
      $all(textSum).forEach(item => {
        item.innerHTML = sum
      })
    }
  }
  const unCheckAll = () => {
    $all(checkAllEl).forEach(item => {
      item.classList.remove('checked')
      if (item.getAttribute('type') == 'checkbox') {
        item.checked = false
      }
    })
    $all(inputCheck).forEach(item => {
      item.checked = false
      if (ifAddClass == true) {
        item.closest(inputCheckParent).classList.remove(toggleCheckClass)
      }
    })
    if (textSum != '') {
      sum = 0
      $all(textSum).forEach(item => {
        item.innerHTML = sum
      })
    }
  }

  $all(inputCheck).forEach(item => {
    if (inputCheckEvent != '') {
      item.addEventListener(inputCheckEvent, event => {
        if (event.target.checked) {
          if (ifAddClass == true) {
            event.target.closest(inputCheckParent).classList.add(toggleCheckClass)
          }
          if (textSum != '') {
            sum = sum + 1
            $all(textSum).forEach(item => {
              item.innerHTML = sum
            })
          }
        } else {
          if (ifAddClass == true) {
            event.target.closest(inputCheckParent).classList.remove(toggleCheckClass)
          }
          if (textSum != '') {
            sum = sum - 1
            $all(textSum).forEach(item => {
              item.innerHTML = sum
            })
          }
        }
      })
    }
  })

  $all(checkAllEl).forEach(item => {
    if (checkAllEvent != '') {
      item.addEventListener(checkAllEvent, event => {
        event.target.classList.toggle(toggleCheckClass)
        if (event.target.classList.contains(toggleCheckClass)) {
          if (event.target.getAttribute('type') == 'checkbox') {
            $all(checkAllEl).forEach(item => {
              item.checked = true
            })
          }
          checkAll()
        } else {
          if (event.target.getAttribute('type') == 'checkbox') {
            $all(checkAllEl).forEach(item => {
              item.checked = false
            })
          }
          unCheckAll()
        }
      })
    }
  })

  if (resetButton != '') {
    $all(resetButton).forEach(item => {
      item.addEventListener(resetButtonEvent, () => {
        unCheckAll()
      })
    })
  }
}

//------------- Uikit ------------------------------------------------//

const uikitSvg = (logoSvg) => {
  var logo = document.querySelector(logoSvg)
  UIkit.svg(logo).svg.then((svg) => {
    svg.setAttribute("preserveAspectRatio", "xMinYMid")
    // svg.querySelector('path').style.stroke = 'red'
  })
}
if (allPresent('.logoimg>img~svg') == true) {
uikitSvg(".logoimg>img")
}
// window.onload = () => {
//   if (oneExist('.logoimg>img') == true) {
//     // console.log("The logo exists")
//     uikitSvg(".logoimg>img")
//   }
// }

//Slideshow tab focus
// Set <a href="https://www.google.com.tw/" onfocus="slideShowFocus('#slideshow', '#slideshow .uk-dotnav a', event)" onkeydown="enterOpenUrl('_blank', event)">Banner1</a> on <ul class="uk-dotnav">
function slideShowFocus(slideshow, tabsArray, event) {
  var slideshow = document.querySelector(slideshow)
  var tabs = document.querySelectorAll(tabsArray)
  for (var i = 0;i < tabs.length;i++) {
    // tabs[i] = UIkit.slideshow(slideshow).show(i)
    if (event.currentTarget == tabs[i]) {
      UIkit.slideshow(slideshow).show(i)
    }
  }
}
//Click 'Enter' to open window by the attribute 'href'
//Or using "event.currentTarget" relpace the "thisKeyDown"
function enterOpenUrl(targetWindow, event) {
  if (event.keyCode === 13) {
    window.open(event.currentTarget.getAttribute('href'), targetWindow)
  }
}


//------------- /Uikit ------------------------------------------------//


//------------- End ES5/6 -------------//
//--------------------------------------------------------------------------------------------------------------------------//


if (oneExist("p:empty, h1:empty, h2:empty, h3:empty, h4:empty, h5:empty, h6:empty, .ifEmpty:empty") == true) {
  removeAll("p:empty, h1:empty, h2:empty, h3:empty, h4:empty, h5:empty, h6:empty, .ifEmpty:empty")
}

//Set the "alt" attribute to all icons for AA
// setAttrs('[class*=fa-]', {'title':''})

//Slideshow adjusts the height to fit the view height, working with CSS: #slideshow .uk-slideshow-items {min-height: auto !important;}
// if (allExist("#slideshow .uk-slideshow-items, header, .bg_bar") == true) {
//   viewHeightMiddle("#slideshow .uk-slideshow-items", "header", ".bg_bar")
//   window.onresize = function() {
//     viewHeightMiddle("#slideshow .uk-slideshow-items", "header", ".bg_bar")
//   }
// }

//Active LeftMenu opening with the 'uk-open' class
// if (allExist('.list_tabs .uk-open')) {
//   toggleAllClass(findAll('.list_tabs .uk-open .toggle'), 'hidden')
// }


// if (allExist(".logo_cht, logo_eng") == true) {
//   var fitText = require("FitText-UMD");
//   // fitText = window.fitText
//   window.fitText = fitText
//   // fitText( document.getElementById("responsive_headline") );
//   fitText(document.querySelector(".logo_cht"), 2.2, {
//     minFontSize: '10px',
//     maxFontSize: '20px'
//   });
//   fitText(document.querySelector(".logo_eng"), 3, {
//     minFontSize: '7px',
//     maxFontSize: '16px'
//   });
// }

// if (allExist("#slideshow .uk-slideshow-items, header, .bg_bar") == true) {
//   window.viewHeightMiddle("#slideshow .uk-slideshow-items", "header", ".bg_bar")
//   window.onload = function() {
//     viewHeightMiddle("#slideshow .uk-slideshow-items", "header", ".bg_bar")
//   }
//   window.onresize = function() {
//     viewHeightMiddle("#slideshow .uk-slideshow-items", "header", ".bg_bar")
//   }
// }


//"DOMContentLoaded" signifies that the HTML body is completely loaded and parsed. The JavaScript inside this block will not run until after that event is fired, therefore the error is avoided
//In the external case as below, doesn't need to use the "DOMContentLoaded" event because the "defer" attribute solved the problem
//<script src="script.js" defer></script>
document.addEventListener("DOMContentLoaded", function () {

})

//uk-slideshow height, working with CSS {min-height: auto !important}
window.onload = function () {
  // viewHeightMiddle('#slideshow .uk-slideshow-items', 'header', '.bg_bar')
  // if (allExist(['.bg_menu', '.bg_menu~section:nth-of-type(1)', '.bg_menu~section:nth-of-type(2)']) == true) {
  //   sameHeight('.bg_menu', '.bg_menu~section:nth-of-type(1)', '.bg_menu~section:nth-of-type(2)')
  // }
  // if (oneExist('.editor table')) {
  //   tableWidth('.editor table')
  // }

  // if (allExist('.list_tabs .uk-open') == true) {
  //   toggleAllClass(findAll('.list_tabs .uk-open .toggle'), 'hidden')
  // }
}
window.onresize = function () {
  // viewHeightMiddle('#slideshow .uk-slideshow-items', 'header', '.bg_bar')
  // if (allExist(['.bg_menu', '.bg_menu~section:nth-of-type(1)', '.bg_menu~section:nth-of-type(2)']) == true) {
  //   sameHeight('.bg_menu', '.bg_menu~section:nth-of-type(1)', '.bg_menu~section:nth-of-type(2)')
  // }
}

//--------------- end pure js ----------------------------------------------------------//