function findFirstChild(parentEL) {
  return parentEL.firstElementChild
}

function findLastChild(parentEL) {
  return parentEL.lastElementChild
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

function navMenu(btn, thisParentTagName, activeParentClassName, classToggle, classHiddenName, classOpenName) {

  const buttons = document.querySelectorAll(btn)

  //----- Reset ------
  // RemoveAddClass(btn + '>:first-child', classHiddenName, '') //Show all right arrow buttons at first
  // RemoveAddClass(btn + '>:last-child', '', classHiddenName) //Hide all down arrow buttons at first
  // // = RemoveAddClass('.listMenu ul.toggle', '', classHiddenName)
  // RemoveAddClass(target + ' ' + subNavTagName.toLowerCase() + classToggle, '', classHiddenName) //Hide All sub menus at first

  for (let i = 0;i < buttons.length;i++) {
    buttons[i].addEventListener('click', function () {

      //------------------------0. Basic: Close one by one ------------------------

      //----- Normal: Close menu one by one (Comment the codes below) -----
      //----- Accordion: open this item and close others in the meantime -----
      // Remove 'active' from all the same level parents
      // RemoveAddClass(targetMenu + ' ' + thisParentTagName.toLowerCase() + classThisParent, classActiveName, '')

      //----- Toggle ------
      toggleAllClass(findChildren(this, classToggle), classHiddenName) //Toggle this arrow btn
      findLastChild(findParent(this, thisParentTagName, '')).classList.toggle(classHiddenName) //Toggle this hidden content
      findParent(this, thisParentTagName, activeParentClassName).classList.toggle(classOpenName) //Toggle active
    })
  }
}

UIkit.icon.add('chevron-right', '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-right"><polyline fill="none" stroke="#000" stroke-width="1.03" points="7 4 13 10 7 16"></polyline></svg>')
UIkit.icon.add('chevron-down', '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-down"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>')

if (allExist(['#offcanvas li>.flex>a:nth-child(2)', 'LI', 'uk-parent', '.toggle', 'hidden', 'open']) == true) {
  navMenu('#offcanvas li>.flex>a:nth-child(2)', 'LI', 'uk-parent', '.toggle', 'hidden', 'open')
}