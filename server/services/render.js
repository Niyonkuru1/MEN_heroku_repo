export const homeRoutes = (req,res)=>{
    res.render('static/index');
}

export const allBlogsRoutes = (req,res)=>{
    res.render('static/viewblogs');
}

export const addBlogRoutes = (req,res)=>{
    res.render('static/create');
}

export const updateBlogRoutes = (req,res)=>{
    res.render('static/update');
}

export const deleteBlogRoutes = (req,res)=>{
    res.render('static/delete');
}