
// background.js
chrome.commands.onCommand.addListener(async (command) => {
   if (command === "vertical-maximize") {
      // Get the last focused window
      const window = await chrome.windows.getLastFocused();

      // Get display information to find screen height
      const displays = await chrome.system.display.getInfo();

      // Find the display that contains this window
      const display = displays.find(d =>
         window.left >= d.bounds.left &&
         window.left < d.bounds.left + d.bounds.width
      ) || displays[0];

      // Update window to span full height while keeping horizontal position/width
      await chrome.windows.update(window.id, {
         top: display.workArea.top,
         height: display.workArea.height,
         state: "normal"
      });
   }
});