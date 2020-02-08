import { expect } from "chai";
import ffmpeg_bin from "ffmpeg-static";
import fs from "fs";
import "mocha";
import { configurator } from "tuckbot-util";
import { DownloadedVideo } from "../../downloaders/downloadedvideo";
import { VideoDownloader } from "../../downloaders/videodownloader";

describe("ffmpeg installed?", () => {
  it("should be a valid path", () => {
    const result = ffmpeg_bin;

    console.log(`ffmpeg_bin.path: ${result}`);

    return expect(fs.existsSync(result)).to.equal(true);
  });
});

describe("v.redd.it video download", () => {
  it("should have a non-null processing dir", () => {
    console.log(`processingDir: ${configurator.file.processingDir}`);
    return expect(configurator.file.processingDir).to.not.null;
  });

  it("should download a .mp4 file", async () => {
    const result = await VideoDownloader.fetch({
      redditPostId: "ezrsxb",
      videoUrl:
        "https://www.reddit.com/r/PublicFreakout/comments/ezrsxb/dont_be_so_afraid_its_ok/"
    });

    return expect(result).to.instanceOf(DownloadedVideo);
  }).timeout(0);
});
