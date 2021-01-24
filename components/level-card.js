const LevelCard = ({title,summary,state,hints}) => {
  console.log(title,summary,state,hints);
  return (
    <>
    <div class="bg-white flex items-center p-2 rounded-xl shadow border max-w-sm">
    <div class="flex-grow p-3">
    <div class="text-lg font-semibold text-gray-700">
      LEVEL 1
    </div>
    <div class="text-sm text-gray-500">
      Unlocked at 2:30 PM
    </div>
  </div>
  <div class="p-2 space-y-1">
    <span class="block h-4 w-4 bg-blue-400 rounded-full"></span>
    <span class="block h-4 w-4 bg-blue-400 rounded-full"></span>
    <span class="block h-4 w-4 bg-blue-400 rounded-full"></span>
  </div>
</div>
</>
  )
}

export default LevelCard