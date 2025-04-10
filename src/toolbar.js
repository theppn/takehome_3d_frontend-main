import $ from "jquery";
import "../styles/toolbar.css";
import { getNotificationCenter } from "./notification";

export function createToolbar(controller) {
  const toolbar = $(".top-toolbar");
  const name = $("<h2>").addClass("project-name").text("Project");
  const changeNameBtn = $("<button>")
    .text("Change name")
    .on('click', () => {
      const newName = prompt("Enter new name", name.text());
      name.text(newName);
      getNotificationCenter().notify("projectName", newName);
    });
  const undoBtn = $("<button>")
    .text("Undo")
    .on('click', () => controller.removeLastShape());
  const redoBtn = $("<button>")
    .text("Redo")
    .on('click', () => controller.reinsertPreviousShape());
  const clearBtn = $("<button>")
    .text("Clear all")
    .on('click', () => controller.clearAll());

  toolbar.append(
    name,
    changeNameBtn,
    undoBtn,
    redoBtn,
    clearBtn,
    $("<div>").attr("id", "react-toolbar-root")
  );
}