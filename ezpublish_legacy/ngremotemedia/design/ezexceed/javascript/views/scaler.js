define(['ngremotemedia/view', './scaled_version', 'jquery-safe', 'ngremotemedia/jcrop'], function(View, ScaledVersion, $) {
  return View.extend(RemoteMediaShared.scaler(ScaledVersion, $));
});