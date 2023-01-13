export const SHOW_MORE_WORKSPACES_LINK_TEXT = 'View all workspaces'
export const RESPONSE_NETWORK_ERROR =
  'Oops, something went wrong! Check your internet connection or try again later.'
export const RESPONSE_NETWORK_INVALID_CREDENTIALS =
  'You are requesting with an invalid credential! Check your username or password.'

export const STATUS_DELETED = 0
export const STATUS_ACTIVE = 10
export const STATUS_DONE = 20
export const ALL_NOTES_STATUS = 30

export const NOTE_TYPE_WITHOUT_TASKS = 0
export const NOTE_TYPE_WITH_TASKS = 1

export const MAX_TASKS_IN_HOME_VIEW = 6
export const MAX_TASKS_IN_NOTE_VIEW = 5
export const DEFAULT_MAX_TASKS_IN_LOADING = 16
export const TASKS_PER_PAGE = 16
export const MAX_NOTES_IN_HOME_VIEW = 7
export const DEFAULT_MAX_NOTES_IN_LOADING = 14
export const NOTES_PER_PAGE = 15
export const MAX_WORKSPACES_IN_HOME_VIEW = 8
export const MAX_WORKSPACES_IN_FILTER_LIST = 10
export const DEFAULT_MAX_WORKSPACES_IN_LOADING = 16
export const WORKSPACES_PER_PAGE = 17

export const DEFAULT_ACTIVE_FILTER_STATUS = 30
export const DEFAULT_ACTIVE_FILTER_LIST_ITEM = { name: 'All notes', status: 30 }
export const ACTIVE_ACTIVE_FILTER_LIST_ITEM = { name: 'Active', status: 10 }
export const DONE_ACTIVE_FILTER_LIST_ITEM = { name: 'Done', status: 20 }
export const DELETED_ACTIVE_FILTER_LIST_ITEM = { name: 'Deleted', status: 0 }

export const SEARCH_PARAM = ['name']
export const NOTE_SEARCH_PARAM = ['name', 'text']
export const WORKSPACE_SEARCH_PARAM = ['name']

export const SORT_BY_RECENT = 'recent'
export const SORT_BY_OLDEST = 'oldest'
export const SORT_BY_A_TO_Z = 'aToZ'
export const SORT_BY_Z_TO_A = 'zToA'
