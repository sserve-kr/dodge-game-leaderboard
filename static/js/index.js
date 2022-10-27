scoreManager = {
    getScore: function(season) {
        if (season) {
            if (season.includes("#")) {
                season = season.split("#")[1];
            }
            console.log("Sent with season: "+ season);
            return fetch(`https://game-api.sserve.work/get-score?season=${season}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data;
            })
        } else {
            console.log("Sent without season");
            return fetch(`https://game-api.sserve.work/get-score`)
            .then(res=>res.json())
            .then(data => {
                console.log(data);
                return data;
            })
        }
    }
}

class Page {
    initPage() {
        this.render(window.location.hash);
        document.querySelector('nav div button').addEventListener('click', () => {
            let season_num = document.querySelector('nav div input').value;
            window.location.hash = season_num;
            this.render(season_num);
        })
    }

    setLoadingStatus() {
        if (document.querySelector('section.content p.no-data')) {
            document.querySelector('section.content p.no-data').remove();
        }
        if (document.querySelector('section.content div.scores')) {
            document.querySelector('section.content div.scores').remove();
        }
        if (!(document.querySelector('section.content p.loading'))) {
            let loading = document.createElement('p');
            loading.classList.add('loading');
            loading.innerText = 'Loading...';
            document.querySelector('section.content').appendChild(loading);
        }
    }

    render(season) {
        this.setLoadingStatus();
        scoreManager.getScore(season).then(data => {
            if (data["scores"].length === 0) {
                let p = document.createElement('p')
                p.classList.add('no-data');
                p.innerText = '현재 기록된 점수가 없습니다.';
                document.querySelector('section.content').appendChild(p);
            } else {
                let div = document.createElement('div');
                div.classList.add('scores');
                document.querySelector('section.content').appendChild(div);
                data["scores"].forEach(scoreObj => {
                    let score_item = document.createElement('div');
                    score_item.classList.add('score');
                    let player_id = document.createElement('div');
                    player_id.innerHTML = `<p>학번</p><p>${scoreObj["id"]}</p>`;
                    let season = document.createElement('div');
                    season.innerHTML = `<p><span>${scoreObj["season"]}</span>시즌 플레이</p>`;
                    let time = document.createElement('div');
                    time.innerHTML = `<p>시간 점수 <span>${scoreObj["time"]}</span></p>`;
                    let action = document.createElement('div');
                    action.innerHTML = `<p>액션 점수 <span>${scoreObj["action"]}</span></p>`;
                    let total = document.createElement('div');
                    total.innerHTML = `<p>총합 <span>${scoreObj["score"]}</span></p>`;
                    score_item.appendChild(player_id);
                    score_item.appendChild(season);
                    score_item.appendChild(time);
                    score_item.appendChild(action);
                    score_item.appendChild(total);
                    document.querySelector('section.content div.scores').appendChild(score_item);
                })
            }
            if (document.querySelector('section.content p.loading')) {
                document.querySelector('section.content p.loading').remove();
            }
        })
    }


}
