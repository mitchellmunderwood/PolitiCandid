import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


export default function ArticleCard(props) {
    const { article } = props;


    return (

        <Grid item  xs={12} sm={12} md={12}>
                
        <Card className="card">
        <Link href={article.url}>
        
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {article.title}
            </Typography>
            <Typography>
              {article.description}
            </Typography>
          </CardContent>

          
          </Link>
        </Card>
        
      </Grid>
    )
}