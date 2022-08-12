import { ScrollDirection } from './types'

export type IsReachBoundary = [boolean, boolean];
class ScrollServer {
  readonly direction: [ScrollDirection, ScrollDirection] = ['horizontal', 'vertical'] // 方向
  private scrollRecords: [number, number] = [0, 0];

  setScroll(el: HTMLElement, value: number, top = true) {
    const method = top ? 'scrollTop' : 'scrollLeft';
    el[method] = value
  }

  // 滚动条是否到达边界
  hasReachBoundary(el: HTMLElement, direction = this.direction[1], offset = 0):IsReachBoundary {
    let reslut: IsReachBoundary = [false, false]
    if(direction === this.direction[1]) {
      reslut = this.hasReachVerticalBoundary(el, offset)
    }else {
      reslut = this.hasReachHorizontalBoundary(el, offset)
    }
    return reslut
  }

  // 横向滚动条是否到达边界
  hasReachHorizontalBoundary(el: HTMLElement, offset: number): IsReachBoundary {
    let reslut: IsReachBoundary = [false, false]
    if(el.scrollLeft < offset) {
      reslut = [true, false]
    }else if(el.scrollLeft + el.clientWidth >= el.scrollWidth - offset) {
      reslut = [false, true]
    }
    return reslut
  }

  // 纵向滚动条是否到达边界
  hasReachVerticalBoundary(el: HTMLElement, offset: number): IsReachBoundary {
    let reslut: IsReachBoundary = [false, false]
    if(el.scrollTop < offset) {
      reslut = [true, false]
    }else if(el.scrollTop + el.clientHeight >= el.scrollHeight - offset) {
      reslut = [false, true]
    }
    return reslut
  }

  // 获取滚动方向
  getDirection(el: HTMLElement): ScrollDirection {
    let reslut: ScrollDirection = 'vertical'
    if(el.scrollLeft !== this.scrollRecords[0]) {
      reslut = this.direction[0]
      this.scrollRecords[0] = el.scrollLeft
    }else if(el.scrollTop !== this.scrollRecords[1]) {
      reslut = this.direction[1]
      this.scrollRecords[1] = el.scrollTop
    }
    
    return reslut
  }
}

export default new ScrollServer()