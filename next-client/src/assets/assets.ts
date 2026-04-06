import { Home, Compass, Bell, MessageSquare, Bookmark, User, Settings } from 'lucide-react'

export const assets = {}

export const menuItemsData = [
    {
        to: '/authenticated',
        label: 'Home',
        Icon: Home
    },
    {
        to: '/authenticated/discover',
        label: 'Explore',
        Icon: Compass
    },
    {
        to: '/authenticated/notifications',
        label: 'Notifications',
        Icon: Bell
    },
    {
        to: '/authenticated/messages',
        label: 'Messages',
        Icon: MessageSquare
    },
    {
        to: '/authenticated/connections',
        label: 'Connections',
        Icon: User
    },
    {
        to: '/authenticated/bookmarks',
        label: 'Bookmarks',
        Icon: Bookmark
    },
    {
        to: '/authenticated/profile',
        label: 'Profile',
        Icon: User
    },
    {
        to: '/authenticated/settings',
        label: 'Settings',
        Icon: Settings
    }
]
