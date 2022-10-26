scoreManager = {
    getScore: function(season) {
        if (season) {
            return fetch(`https://game-api.sserve.work/get-score?season=${season}`)
            .then(res => res.json())
            .then(data => {
                return data;
            })
        } else {
            return fetch(`https://game-api.sserve.work/get-score`)
            .then(res=>res.json())
            .then(data => {
                return data;
            })
        }
    }
}

class Page {
    initPage() {
        this.render(null);
        // detect hash change
        window.addEventListener('hashchange', (e) => {
            let season = window.location.hash;
            this.render(season);
        })
    }

    render(season) {
        if (document.querySelector('section.content p.loading')) {
            document.querySelector('section.content p.loading').remove();
        }
        scoreManager.getScore(season).then(data => {
            if (data.scores.length === 0) {
                if (document.querySelector('section.content div.scores')) {
                    document.querySelector('section.content div.scores').remove();
                }
                let p = document.createElement('p')
                p.classList.add('no-data');
                p.innerText = '현재 기록된 점수가 없습니다.';
                document.querySelector('section.content').appendChild(p);
            } else {
                if (document.querySelector('section.content div.scores')) {
                    if (document.querySelector('section.content div.scores div.score')) {
                        Array.prototype.forEach.call(
                            document.querySelectorAll('section.content div.scores div.score'),
                            (el) => {
                                el.remove();
                            }
                        )
                    }
                } else {
                    let div = document.createelement('div');
                    div.classList.add('scores');
                    document.querySelector('section.content').appendChild(div);
                }
                if (document.querySelector('section.content p.no-data')) {
                    document.querySelector('section.content p.no-data').remove();
                }
                data.scores.forEach(scoreObj => {
                    let score_item = document.createElement('div');
                    score_item.classList.add('score');
                    let player_id = document.createElement('div');
                    player_id.innerHTML = `<p>학번</p><p>${scoreObj.id}</p>`;
                    let season = document.createElement('div');
                    season.innerHTML = `<p><span>${scoreObj.season}</span>시즌 플레이</p>`;
                    let time = document.createElement('div');
                    time.innerHTML = `<p>시간 점수 <span>${scoreObj.time}</span></p>`;
                    let action = document.createElement('div');
                    action.innerHTML = `<p>액션 점수 <span>${scoreObj.action}</span></p>`;
                    let total = document.createElement('div');
                    total.innerHTML = `<p>총합 <span>${scoreObj.score}</span></p>`;
                    score_item.appendChild(player_id);
                    score_item.appendChild(season);
                    score_item.appendChild(time);
                    score_item.appendChild(action);
                    score_item.appendChild(total);
                    document.querySelector('section.content').appendChild(score_item);
                })
            }
        })
    }


}