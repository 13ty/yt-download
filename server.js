const express = require('express');
    const ytdl = require('ytdl-core');
    const ffmpeg = require('fluent-ffmpeg');
    const path = require('path');
    const fs = require('fs-extra');

    const app = express();
    const port = 3000;

    app.use(express.json());

    app.post('/api/download', async (req, res) => {
      const { url } = req.body;
      try {
        const videoInfo = await ytdl.getInfo(url);
        const formats = videoInfo.formats.filter(format => format.container === 'mp4');

        if (!formats.length) return res.status(400).json({ success: false, message: 'No suitable formats found' });

        const format = formats[0];
        const outputPath = path.join(__dirname, 'downloads', `${videoInfo.videoDetails.title}.mp4`);

        await fs.ensureDir(path.dirname(outputPath));

        ytdl(url, { quality: format.quality }).pipe(fs.createWriteStream(outputPath))
          .on('finish', () => {
            res.json({ success: true, message: 'Download completed' });
          })
          .on('error', (err) => {
            console.error(err);
            res.status(500).json({ success: false, message: 'Error downloading video' });
          });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while downloading the video' });
      }
    });

    app.get('/api/files', async (req, res) => {
      try {
        const files = await fs.readdir(path.join(__dirname, 'downloads'));
        res.json(files.map(file => ({ name: file })));
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching files' });
      }
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
