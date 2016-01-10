/**
 * Created by epotignano on 10/01/16.
 */






NavigatorSubject.subscribe((route)=> {
    switch(route.path) {
        case('login'):
            this.props.toRoute({
                "component": Login,
                "headerStyle": styles.facebookHeader
            });
            break;
        case('categories'):
            this.props.toRoute({
                "component": <Text>View for Categories</Text>
            });

        case('post'):
            this.props.toRoute({
                "component": PostView
            })
    }
});
