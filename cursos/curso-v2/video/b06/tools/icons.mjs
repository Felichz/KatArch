// One-off: renders the Lucide icons the video uses into assets/icons.js (window.ICONS), so the composition needs no network.
// Needs react, react-dom and lucide-react (e.g. NODE_PATH=/path/to/node_modules node tools/icons.mjs).
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
// resolve the packages from NODE_PATH too (ESM imports ignore it)
const req = createRequire(join(process.env.NODE_PATH?.split(':')[0] ?? process.cwd(), 'noop.js'));
const { createElement } = req('react');
const { renderToStaticMarkup } = req('react-dom/server');
const L = req('lucide-react');
const names = {
  // the KatArch base set
  user: 'User', users: 'Users', userCheck: 'UserCheck', phone: 'Smartphone', server: 'Server', card: 'CreditCard', truck: 'Truck', cpu: 'Cpu',
  pin: 'MapPin', map: 'Map', radio: 'Radio', lock: 'Lock', doc: 'ScrollText', trophy: 'Trophy', x: 'X', check: 'Check', clock: 'Clock',
  building: 'Building2', receipt: 'Receipt', book: 'BookOpen', chart: 'BarChart3', db: 'Database', network: 'Network', scale: 'Scale',
  file: 'FileText', sparkles: 'Sparkles', coins: 'Coins', listChecks: 'ListChecks', flag: 'Flag', help: 'CircleHelp', brain: 'Brain',
  activity: 'Activity', mail: 'Mail', boxes: 'Boxes', target: 'Target', calendar: 'CalendarDays', shieldAlert: 'ShieldAlert',
  notebook: 'NotebookPen', arrowRight: 'ArrowRight', pencil: 'PenLine', search: 'Search', pause: 'Pause', cloudRain: 'CloudRain',
  gauge: 'Gauge', wifiOff: 'WifiOff', message: 'MessageSquare', rotate: 'RotateCw', camera: 'Camera', git: 'GitBranch', route: 'Route',
  alert: 'TriangleAlert', gavel: 'Gavel',
  // Five Nines: the fleet and the city
  bike: 'Bike', car: 'Car', battery: 'Battery', batteryLow: 'BatteryLow', batteryFull: 'BatteryFull', zap: 'Zap', plug: 'Plug',
  train: 'TrainFront', home: 'House', landmark: 'Landmark', mountain: 'Mountain', ticket: 'Ticket', sun: 'Sun', wrench: 'Wrench',
  // AI, code and data
  code: 'CodeXml', bot: 'Bot', eye: 'Eye', image: 'Image', cloud: 'Cloud', wifi: 'Wifi', antenna: 'Antenna', layers: 'Layers',
  link: 'Link', tag: 'Tag', euro: 'Euro', trendUp: 'TrendingUp', trendDown: 'TrendingDown', lineChart: 'ChartLine', refresh: 'RefreshCw',
  shieldCheck: 'ShieldCheck', door: 'DoorOpen', wallet: 'Wallet', hourglass: 'Hourglass', ban: 'Ban', calculator: 'Calculator',
  repeat: 'Repeat', signpost: 'Signpost', cog: 'Cog', filter: 'Filter', megaphone: 'Megaphone', stamp: 'Stamp', milestone: 'Milestone',
  split: 'Split', unplug: 'Unplug', puzzle: 'Puzzle', presentation: 'Presentation', clapper: 'Clapperboard', award: 'Award',
  package: 'Package', keyboard: 'Keyboard', click: 'MousePointerClick', crosshair: 'Crosshair', footprints: 'Footprints', eyeOff: 'EyeOff',
  // more vehicles, places and people
  scooter: 'Scooter', van: 'Van', carFront: 'CarFront', bus: 'Bus', parking: 'CircleParking', navigation: 'Navigation', locate: 'LocateFixed',
  radar: 'Radar', globe: 'Globe', satellite: 'Satellite', router: 'Router', signal: 'Signal', nfc: 'SmartphoneNfc', hardHat: 'HardHat',
  factory: 'Factory', umbrella: 'Umbrella', cloudSun: 'CloudSun', cloudBolt: 'CloudLightning', party: 'PartyPopper', music: 'Music', tent: 'Tent',
  plugZap: 'PlugZap', batteryCharging: 'BatteryCharging', batteryWarning: 'BatteryWarning', ghost: 'Ghost',
  // reasoning, documents and git
  dice: 'Dices', fn: 'SquareFunction', shield: 'Shield', unlock: 'Unlock', key: 'Key', thumbsUp: 'ThumbsUp', thumbsDown: 'ThumbsDown', star: 'Star',
  smile: 'Smile', frown: 'Frown', video: 'Video', ruler: 'Ruler', messages: 'MessagesSquare', msgText: 'MessageSquareText', textInput: 'TextCursorInput',
  lightbulb: 'Lightbulb', piggy: 'PiggyBank', banknote: 'Banknote', cart: 'ShoppingCart', history: 'History', folder: 'Folder', folderGit: 'FolderGit2',
  commit: 'GitCommitHorizontal', compare: 'GitCompare', fileDiff: 'FileDiff', film: 'Film', scanEye: 'ScanEye', scan: 'ScanLine', spray: 'SprayCan',
  workflow: 'Workflow', equal: 'Equal', notEqual: 'EqualNot', divide: 'Divide', plus: 'Plus', percent: 'Percent', searchCheck: 'SearchCheck',
  badgeCheck: 'BadgeCheck', circleCheck: 'CircleCheck', circleX: 'CircleX', info: 'Info', medal: 'Medal', crown: 'Crown', clipboard: 'ClipboardList',
  clipCheck: 'ClipboardCheck', table: 'Table2', waypoints: 'Waypoints', merge: 'Merge', chartCol: 'ChartColumn', weight: 'Weight', bell: 'Bell',
  siren: 'Siren', brainCircuit: 'BrainCircuit', botMsg: 'BotMessageSquare', circuit: 'CircuitBoard', wand: 'WandSparkles', images: 'Images',
  imageOff: 'ImageOff', mic: 'Mic', ear: 'Ear', building2: 'Building', thermometer: 'Thermometer',
};
const out = {};
for (const [k, n] of Object.entries(names)) {
  if (!L[n]) throw new Error('missing icon ' + n);
  out[k] = renderToStaticMarkup(createElement(L[n], { size: 24, strokeWidth: 1.75, color: 'currentColor' })).replace(/ class="[^"]*"/, '');
}
writeFileSync(new URL('../assets/icons.js', import.meta.url), '/* generated by tools/icons.mjs (Lucide, ISC) */\nwindow.ICONS = ' + JSON.stringify(out, null, 0) + ';\n');
console.log(Object.keys(out).length, 'icons');
