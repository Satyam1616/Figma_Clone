import { BaseUserMeta, User } from "@liveblocks/client";
import { Gradient, Pattern } from "fabric/fabric-impl";

export enum CursorMode {
  Hidden,
  Chat,
  ReactionSelector,
  Reaction,
}

export type CursorState =
  | { mode: CursorMode.Hidden }
  | {
      mode: CursorMode.Chat;
      message: string;
      previousMessage: string | null;
    }
  | { mode: CursorMode.ReactionSelector }
  | {
      mode: CursorMode.Reaction;
      reaction: string;
      isPressed: boolean;
    };

export type Reaction = {
  value: string;
  timestamp: number;
  point: { x: number; y: number };
};

export type ReactionEvent = {
  x: number;
  y: number;
  value: string;
};

export type ShapeData = {
  type: string;
  width: number;
  height: number;
  fill: string | Pattern | Gradient;
  left: number;
  top: number;
  objectId?: string; // Made objectId optional
};

export type Attributes = {
  width: string;
  height: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fill: string;
  stroke: string;
};

export type ActiveElement = {
  name: string;
  value: string;
  icon: string;
} | null;

export interface CustomFabricObject<T extends fabric.Object = fabric.Object>
  extends fabric.Object {
  objectId?: string;
}

export type ModifyShape = {
  canvas: fabric.Canvas;
  property: keyof Attributes; // Ensure property is a key of Attributes
  value: any; // Consider using a more specific type
  activeObjectRef: React.MutableRefObject<fabric.Object | null>;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type ElementDirection = {
  canvas: fabric.Canvas;
  direction: string;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type ImageUpload = {
  file: File;
  canvas: React.MutableRefObject<fabric.Canvas>;
  shapeRef: React.MutableRefObject<fabric.Object | null>;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type RightSidebarProps = {
  elementAttributes: Attributes;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
  fabricRef: React.RefObject<fabric.Canvas | null>;
  activeObjectRef: React.RefObject<fabric.Object | null>;
  isEditingRef: React.MutableRefObject<boolean>;
  syncShapeInStorage: (obj: fabric.Object) => void; // Specified obj type
};

export type NavbarProps = {
  activeElement: ActiveElement;
  imageInputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleActiveElement: (element: ActiveElement) => void;
};

export type ShapesMenuProps = {
  item: {
    name: string;
    icon: string;
    value: ActiveElement[]; // Specify array of ActiveElement
  };
  activeElement: ActiveElement; // Specify as ActiveElement
  handleActiveElement: (element: ActiveElement) => void; // Specify function type
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void; // Specify function type
  imageInputRef: React.MutableRefObject<HTMLInputElement | null>; // Specify ref type
};

export type Presence = any; // Consider specifying a more detailed type if possible

export type LiveCursorProps = {
  others: readonly User<Presence, BaseUserMeta>[]; // Ensure User type is valid
};

export type CanvasMouseDown = {
  options: fabric.IEvent;
  canvas: fabric.Canvas;
  selectedShapeRef: React.MutableRefObject<fabric.Object | null>; // Specify ref type
  isDrawing: React.MutableRefObject<boolean>;
  shapeRef: React.MutableRefObject<fabric.Object | null>;
};

export type CanvasMouseMove = {
  options: fabric.IEvent;
  canvas: fabric.Canvas;
  isDrawing: React.MutableRefObject<boolean>;
  selectedShapeRef: React.MutableRefObject<fabric.Object | null>; // Specify ref type
  shapeRef: React.MutableRefObject<fabric.Object | null>; // Specify ref type
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type CanvasMouseUp = {
  canvas: fabric.Canvas;
  isDrawing: React.MutableRefObject<boolean>;
  shapeRef: React.MutableRefObject<fabric.Object | null>; // Specify ref type
  activeObjectRef: React.MutableRefObject<fabric.Object | null>;
  selectedShapeRef: React.MutableRefObject<fabric.Object | null>; // Specify ref type
  syncShapeInStorage: (shape: fabric.Object) => void;
  setActiveElement: React.Dispatch<React.SetStateAction<ActiveElement>>; // Specify function type
};

export type CanvasObjectModified = {
  options: fabric.IEvent;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type CanvasPathCreated = {
  options: fabric.IEvent & { path: CustomFabricObject<fabric.Path> };
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type CanvasSelectionCreated = {
  options: fabric.IEvent;
  isEditingRef: React.MutableRefObject<boolean>;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
};

export type CanvasObjectScaling = {
  options: fabric.IEvent;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
};

export type RenderCanvas = {
  fabricRef: React.MutableRefObject<fabric.Canvas | null>;
  canvasObjects: any; // Consider specifying a more detailed type
  activeObjectRef: React.MutableRefObject<fabric.Object | null>; // Specify ref type
};

export type CursorChatProps = {
  cursor: { x: number; y: number };
  cursorState: CursorState;
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
  updateMyPresence: (
    presence: Partial<{
      cursor: { x: number; y: number };
      cursorColor: string;
      message: string;
    }>
  ) => void;
};
