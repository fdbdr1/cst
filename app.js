const express = require('express');
const bodyParser = require('body-parser');

const PORT = 8081;

let contentMeta = new Array();
let contentDetail = new Array();

contentMeta.push({'id': "1", 'title': 'testcontent'});
contentMeta.push({'id': "4", 'title': 'testcontent'});
contentDetail.push({'id': "2", 'locale': "de", 'title': 'Inhalt', 'description': 'Beschreibung', 'metaId': "1"});
contentDetail.push({'id': "3", 'locale': "en", 'title': 'Content', 'description': 'Description', 'metaId': "1"});
contentDetail.push({'id': "5", 'locale': "en", 'title': 'Content', 'description': 'Description', 'metaId': "4"});
contentDetail.push({'id': "6", 'locale': "en", 'title': 'Content', 'description': 'Description', 'metaId': "4"});



const app = express();
app.use(bodyParser.json());
app.set({'json escape': true});

// app.get('', () => {});

function missingBodyElement (bodyElement) {
    return bodyElement + ' not defined'
};

app.post('/cst/meta', (req, res) => {
    console.log('[GET] ' + req.url + '\t' + JSON.stringify(req.body));
    // console.log(JSON.stringify(contentMeta));
    if(!req.body.id){
        res.status(404);
        res.write(missingBodyElement('Metadata ID'));
        res.end();
    };
    let contentMetaIndex = contentMeta.findIndex(obj => obj.id === req.body.id);
    res.send(JSON.stringify(contentMeta[contentMetaIndex]));
});

app.post('/cst/detail', (req, res) => {
    console.log('[GET] ' + req.url + '\t' + JSON.stringify(req.body));
    if(!req.body.id){
        res.status(404);
        res.write(missingBodyElement('Detail ID'))
        res.end();
    };
    let contentDetailIndex = contentDetail.findIndex(obj => obj.id === req.body.id);
    res.send(JSON.stringify(contentDetail[contentDetailIndex]));
});

app.post('/cst/content', (req, res) => {
    console.log('[POST] ' + req.url + '\t' + JSON.stringify(req.body));
    if(!req.body.id){
        res.status(404);
        res.write(missingBodyElement('Content ID'));
        res.end();
    }
    else{
        let resobj = new Object();
        resobj.metaId = req.body.id;
        let contentDetailElements = contentDetail.filter(obj => obj.metaId === req.body.id);

        resobj.detailId = new Array();
        contentDetailElements.forEach(element => resobj.detailId.push(element.id));

        res.send(JSON.stringify(resobj));
    };
});

app.listen(PORT, () => {console.log(`listening on port ${PORT}...`)});