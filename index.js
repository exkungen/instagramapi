let mysql = require('mysql');
const Instagram = require('node-instagram').default;
let moment = require('moment');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '23136_database',
    port: 3307,
    charset: 'utf8mb4'
});
const instagram = new Instagram({
    clientId: 'd76a10c43f204d3f9ab12f123571fdf6',
    clientSecret: 'b71898823e4142fab51886756d98a326',
    accessToken: '439752721.1677ed0.6a343b0ec00d487988773e2348a59fc7',
});

connection.connect(function(err) {
    if (err)
        throw err;
    else {
        console.log('Connected to MySQL');



    }

instagram.get('users/self/media/recent',{count:'60'}).then((data) => {
    let stringify = JSON.stringify(data.data);
   let parsed = JSON.parse(stringify);

for (let i = 0; i < parsed.length; i++) {
    // console.log(parsed[i].caption.text);
    let time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    let data = [


        [0,parsed[i].caption.id,parsed[i].link,parsed[i].caption.text,parsed[i].created_time,parsed[i].likes.count,'Instagram',time]


    ];
    let sql = "INSERT INTO stats_socials (ss_m_id,ss_id_soc,ss_postlink,ss_text,ss_date,ss_aantal,ss_type,ss_last_update) VALUES ? ON DUPLICATE KEY UPDATE ss_id_soc=ss_id_soc";
    connection.query(sql, [data], function (err, result) {
        if (err) throw err;
        console.log("The following number of rows have been added" + result.affectedRows);
    });
}




});});
