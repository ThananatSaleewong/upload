import PocketBase from "pocketbase";

const pb = new PocketBase("https://pocketbase-spaces.fly.dev");
pb.autoCancellation(false);
export default pb;
