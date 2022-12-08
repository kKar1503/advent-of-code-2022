const sampleInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

type Directory = Map<string, { size: number; subDirecotries: Directory }>;
type DirBreakDown = [size: number, dirs: string[]];

const convertInput = (input: string) => input.split('\n');

const breakdownLs = (ls: string[]) => {
  const breakdown: DirBreakDown = [0, []];
  ls.forEach((f) => {
    if (f.startsWith('dir')) {
      breakdown[1].push(f.split(' ')[1]);
    } else {
      breakdown[0] += parseInt(f.split(' ')[0]);
    }
  });
  return breakdown;
};

const getLs = (inputArray: string[], startIndex: number) => {
  const lsArray: string[] = [];
  let endIndex = -1;
  for (let i = startIndex; i < inputArray.length; i++) {
    if (inputArray[i].startsWith('$')) {
      endIndex = i - 1;
      break;
    } else {
      lsArray.push(inputArray[i]);
    }
  }
  return [lsArray, endIndex] as [string[], number];
};

const dirTraversal = (input: string) => {
  const inputArray = convertInput(input);
  let directoryDepth: string[] = ['/'];
  const directory: Directory = new Map();
  for (let i = 1; i < inputArray.length; i++) {
    const currentLine = inputArray[i];
    if (currentLine.startsWith('$ ls')) {
      const dirName = currentLine.split(' ')[2];
      const [lsArray, endIndex] = getLs(inputArray, i + 1);
      const [size, dirs] = breakdownLs(lsArray);
      const subDirectories: Directory = new Map();
      // dirs.forEach(dir => subDirectories.set(dir, {}))
      directory.set(dirName, { size, subDirecotries: new Map() });
    }
  }
};
