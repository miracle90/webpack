console.log('a');

const oldCode = "console.log('a')";
const newCode = "console.log('a')";

// eval的作用 => 方便缓存，提高重复的构建速度
if (oldCode === newCode) {
	console.log('~~~~~~~~~');
}

eval("console.log('a')");
