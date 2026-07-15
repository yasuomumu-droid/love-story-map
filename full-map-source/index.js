import './style/main.css'
import Application from './javascript/Application.js'

window.application = new Application({
    $canvas: document.querySelector('.js-canvas'),
    useComposer: true
})

const storyPanel = document.querySelector('.js-story-panel')
const storyEyebrow = document.querySelector('.js-story-eyebrow')
const storyTitle = document.querySelector('.js-story-title')
const storyBody = document.querySelector('.js-story-body')
const storyAudio = document.querySelector('.js-story-audio')
const storyStatus = document.querySelector('.js-story-status')
const storyLink = document.querySelector('.js-story-link')

const stopStoryAudio = () =>
{
    storyAudio.pause()
    storyAudio.currentTime = 0
}

window.addEventListener('love-story:open', (event) =>
{
    storyEyebrow.textContent = event.detail.eyebrow
    storyTitle.textContent = event.detail.title
    storyPanel.classList.add('is-visible')

    if(event.detail.audioSource)
    {
        storyBody.hidden = true
        storyLink.hidden = true
        storyAudio.hidden = false
        storyStatus.hidden = false
        storyStatus.textContent = 'Đang phát kỷ niệm âm nhạc…'

        stopStoryAudio()
        storyAudio.src = event.detail.audioSource
        storyAudio.load()

        const playPromise = storyAudio.play()
        if(playPromise)
        {
            playPromise.catch(() =>
            {
                storyStatus.textContent = 'Nhấn nút phát để bắt đầu nghe.'
            })
        }
    }
    else if(event.detail.linkHref)
    {
        stopStoryAudio()
        storyAudio.hidden = true
        storyStatus.hidden = true
        storyBody.hidden = true
        storyLink.hidden = false
        storyLink.href = event.detail.linkHref
        storyLink.textContent = event.detail.linkLabel || event.detail.linkHref
        storyLink.target = event.detail.linkHref.startsWith('mailto:') ? '_self' : '_blank'
    }
    else
    {
        stopStoryAudio()
        storyAudio.hidden = true
        storyStatus.hidden = true
        storyLink.hidden = true
        storyBody.hidden = false
        storyBody.textContent = event.detail.body || ''
    }
})

document.querySelector('.js-story-close').addEventListener('click', () =>
{
    stopStoryAudio()
    storyPanel.classList.remove('is-visible')
})

storyAudio.addEventListener('play', () =>
{
    storyStatus.textContent = 'Đang phát'
})

storyAudio.addEventListener('pause', () =>
{
    if(storyAudio.currentTime > 0 && !storyAudio.ended)
    {
        storyStatus.textContent = 'Đã tạm dừng'
    }
})

storyAudio.addEventListener('ended', () =>
{
    storyStatus.textContent = 'Bài hát đã kết thúc'
})

storyAudio.addEventListener('error', () =>
{
    storyStatus.textContent = 'Không thể tải bài hát này.'
})
