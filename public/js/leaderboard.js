window.onload = async function() {
    await fetch("/achievements")
        .then(response => response.json())
        .then(users => {
            const list = document.getElementById("Leaderboard");

            users.forEach(user => {
                const li = document.createElement("li");
                li.classList.add("leaderboard-entry");
                const ul = document.createElement("ul");
                ul.classList.add("leaderboard-entry-info");
                const username = document.createElement("li");
                username.textContent = user.name;
                const score = document.createElement("li");
                score.textContent = user.score;
                const date = document.createElement("li");
                date.textContent = user.date;
                ul.appendChild(username);
                ul.appendChild(score);
                ul.appendChild(date);
                li.appendChild(ul);
                list.appendChild(li);
            });
        });
}