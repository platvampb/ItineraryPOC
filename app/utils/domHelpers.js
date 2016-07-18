"use strict";

// findPos() by quirksmode.org
// Finds the absolute position of an element on a page
export function findPos(obj) {
  var curleft = 0,
  curtop = 0

	if (obj.offsetParent) {
		do {
			obj = obj.offsetParent
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		} while (obj.offsetParent)
	}
	return [curleft, curtop]
}

// getPageScroll() by quirksmode.org
// Finds the scroll position of a page
export function getPageScroll() {
  var xScroll, yScroll
  if (window.self && window.self.pageYOffset) {
    yScroll = window.self.pageYOffset
    xScroll = window.self.pageXOffset
  } else if (document.documentElement && document.documentElement.scrollTop) {
    yScroll = document.documentElement.scrollTop
    xScroll = document.documentElement.scrollLeft
  } else if (document.body) {// all other Explorers
    yScroll = document.body.scrollTop
    xScroll = document.body.scrollLeft
  }
  return [xScroll, yScroll]
}

// Finds the position of an element relative to the viewport.
export function findPosRelativeToViewport(obj) {
    var objPos = findPos(obj)
    var scroll = getPageScroll()
    return [ objPos[0] - scroll[0], objPos[1] - scroll[1] ]
}
