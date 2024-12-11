# yt-download
Explanation:
package.json: Defines the project dependencies and scripts.
main.js: Sets up the Electron application window.
index.html: Provides a simple GUI for users to input YouTube URLs, download videos, and see a list of downloaded files.
server.js: Handles video downloading and file management using Express.
Steps to Run:
Save the above content in a directory.
Open a terminal and navigate to that directory.
Run npm install --save-dev electron express ytdl-core fluent-ffmpeg path fs-extra.
Start the application by running node server.js.
This will start an Electron app where users can download YouTube videos, manage them, and convert them to different formats.
