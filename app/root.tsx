import { ThemeProvider, withEmotionCache } from '@emotion/react'
import {
  Alert,
  AlertTitle,
  CssBaseline,
  Typography,
  unstable_useEnhancedEffect as useEnhancedEffect,
} from '@mui/material'
import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useTransition,
} from '@remix-run/react'
import nProgress from 'nprogress'
import nProgressStyles from 'nprogress/nprogress.css'
import { useContext, useEffect } from 'react'
import type { ThemeName } from './common/theme'
import { DEFAULT_THEME, themes } from './common/theme'
import { getUserTheme } from './common/theme.server'
import Link from './components/Link'
import ClientStyleContext from './material/ClientStyleContext.client'

export interface LoaderData {
  themeName: ThemeName
}

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({ themeName: await getUserTheme(request) })
}

export const headers: HeadersFunction = () => ({
  'Accept-CH': 'Sec-CH-Prefers-Color-Scheme',
})

export const meta: MetaFunction = () => {
  return {
    title: 'URL Shortener',
    charSet: 'utf-8',
    description: 'A URL Shortener made with Remix',
    viewport: 'width=device-width, initial-scale=1',
  }
}
export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: nProgressStyles },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
      rel: 'stylesheet',
    },
  ]
}

interface DocumentProps {
  themeName: ThemeName
  children: React.ReactNode
}