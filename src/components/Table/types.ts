import { CSSProperties } from '@vue/runtime-dom'
import { PositionProperty } from 'csstype';

type TableData = Record<string, any>
type TableScrollType = {
  x: number;
  y: number;
}
type ScrollDirection = 'horizontal' | 'vertical';

interface ColumnOptions {
  title: string;
  key: string;
  slot: string;
  fixed: string;
  width: number;
  minWidth: number;
  maxWidth: number;
  scopedSlots: ScopedSlots;
  // renderHeader:
  // render:
}

interface TableSectionEls {
  head: HTMLElement;
  body: HTMLElement;
  foot: HTMLElement;
}

interface ColStyle extends CSSProperties {
  left: string;
  right: string;
  boxShadow: string;
  position: PositionProperty;
}

interface ColStyleCls {
  style: Partial<ColStyle>;
  cls: string
}

interface ScopedSlots {
  customRender: string
}

export { 
  ColumnOptions, 
  TableData , 
  TableScrollType , 
  TableSectionEls,
  ScrollDirection,
  ColStyleCls,
  ColStyle,
  ScopedSlots
}
