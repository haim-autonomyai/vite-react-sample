interface AvatarProps {
  nickname: string,
  realname: string
}

function Avatar(props: AvatarProps) {
  return (
    <div className='
      avatar__container 
      flex 
      flex-row
      items-center
      w-full
      '>

      <div className='avatar__photo mr-20'>
        <img
          className='h-32 w-32 rounded-full hover:scale-110 transition-transform bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] p-1 object-cover'
          src="/src/assets/photo.png"
          alt="Avatar"
        />
      </div>

      <div className='avatar__texts text-center justify-between'>

        <div className='text__title'>
          <h1>{props.nickname}</h1>
        </div>

        <div className='text__name mt-3'>
          <h2>{props.realname}</h2>
        </div>

      </div>

    </div>
  );
}

export default Avatar;