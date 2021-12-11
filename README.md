# RT Poll

RT Poll is a completely free public poll platform built using [Supabase](https://supabase.com/) for their [Holiday Hackdays](https://www.madewithsupabase.com/holiday-hackdays) hackathon.

It allows authenticated users to easily create polls with multiple options, share them via link, and vote on polls shared by other users. To make the polls more interactive, RT Poll uses the realtime capabilities of the Supabase database, and uses [Row Level Security (RLS)](https://supabase.com/docs/guides/auth/row-level-security) to ensure that the data remains secure and accurate.

RT Poll is publicly available at https://rtpoll.vercel.app/. 

Built with ❤️ by
* Emilio — [GitHub](https://github.com/emilioschepis) · [Twitter](https://twitter.com/emilioschepis)
* Federico — no GitHub or Twitter yet

## Technologies

This website is built using Supabase, [Next.js](https://nextjs.org/) and [Chakra UI](https://chakra-ui.com/), and it is hosted on [Vercel](https://vercel.com/).

### Supabase

The main goal of this hackathon project was to test out the new capabilities of the realtime database on Supabase, that now supports Row Level Security. However, RT Poll leverages multiple Supabase services:

* **Supabase Auth**: used to let users sign in or create accounts using magic links to reduce friction
* **Supabase Database**: used as database to keep data about polls, choices, votes, and the users themselves
* **Supabase Storage**: used to store the users' profile pictures

This is the current database schema:

![RT Poll Database Schema](https://dddkjfjfrlelulpqqrfx.supabase.in/storage/v1/object/public/public/rtpoll-schema.png)
(made with [Supabase Schema](https://www.madewithsupabase.com/p/supabase-schema))

## Quick demo

Here's a simple video of the realtime capabilities of RT Poll:

https://user-images.githubusercontent.com/16031715/145691673-e33f23fd-9be1-4241-b9b3-dac550ce6690.mp4
