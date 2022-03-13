import { FaHome, FaHeart } from 'react-icons/fa'

import { RiSearchLine } from 'react-icons/ri'
import { BiLibrary } from 'react-icons/bi'
import { BsPlusLg } from 'react-icons/bs'

export const navData = [
  {
    icon: FaHome,
    label: 'Home',
  },
  {
    icon: RiSearchLine,
    label: 'Search',
  },
  {
    icon: BiLibrary,
    label: 'Your Library',
  },
  {
    label: 'Spacer',
  },

  {
    icon: FaHeart,
    label: 'Liked Songs',
  },

  {
    icon: BsPlusLg,
    label: 'Create PlayList',
  },
]
