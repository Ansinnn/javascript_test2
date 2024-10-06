"use strict";

let input = document.getElementById('input')
let result = document.getElementById('result')
const apiKey = 'b71d338303d24f5aac9c16fa515b9990'

async function searchBtn() {
    let topic = input.value
    if(topic == ""){
        alert('검색어를 입력해주세요.')
        return;
    }
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${topic}
            &sortBy=publishedAt&apiKey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        // console.log(data)
        result.innerHTML=''

        if (data.totalResults == 0) {
            result.innerHTML = '검색 결과가 없습니다.'

        } else {
            data.articles.forEach(article=>{
                let li = document.createElement('li')
                li.className = "news"

                // 컨텐츠박스
                let contentsBox = document.createElement('div')
                contentsBox.className = "news-contents-box"

                let title = document.createElement('h2')
                title.className = "news-title"
                title.textContent = article.title

                let author = document.createElement('span')
                author.className = "news-author"
                author.textContent = article.author

                let date = document.createElement('span')
                date.className = "news-date"
                date.textContent = article.publishedAt

                let url = document.createElement('a')
                url.setAttribute('href', article.url)
                url.setAttribute('target','_blank')
                url.className = "news-url"
                url.textContent = 'more'

                let description = document.createElement('p')
                description.className = "news-description"
                description.textContent = article.description
      
                // 이미지박스
                let imgBox = document.createElement('div')
                imgBox.className = "news-img-box"

                let img = document.createElement('img')
                img.setAttribute('src', article.urlToImage)
                
                // Append
                result.appendChild(li)

                li.appendChild(contentsBox)
                contentsBox.appendChild(title)
                contentsBox.appendChild(author)
                contentsBox.appendChild(date)
                contentsBox.appendChild(url)
                contentsBox.appendChild(description)

                li.appendChild(imgBox)
                imgBox.appendChild(img)
            })           
        }
    } catch(error) {
        console.log('Fetching error!')
    }
}

